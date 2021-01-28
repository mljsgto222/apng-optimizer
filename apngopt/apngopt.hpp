#include <stdio.h>
#include <stdlib.h>
#include <vector>
#include "png.h"     /* original (unpatched) libpng is ok */
#include "zlib.h"

struct CHUNK { unsigned char * p; unsigned int size; };
struct APNGFrame { unsigned char * p, ** rows; unsigned int w, h, delay_num, delay_den; };
struct COLORS { unsigned int num; unsigned char r, g, b, a; };
struct OP { unsigned char * p; unsigned int size; int x, y, w, h, valid, filters; };
struct rgb { unsigned char r, g, b; };


class APNGOpt
{
private:
    /* APNG decoder - begin */
    void compose_frame(unsigned char ** rows_dst, unsigned char ** rows_src, unsigned char bop, unsigned int x, unsigned int y, unsigned int w, unsigned int h);

    unsigned int read_chunk(FILE * f, CHUNK * pChunk);

    int processing_start(png_structp & png_ptr, png_infop & info_ptr, void * frame_ptr, bool hasInfo, CHUNK & chunkIHDR, std::vector<CHUNK>& chunksInfo);

    int processing_data(png_structp png_ptr, png_infop info_ptr, unsigned char * p, unsigned int size);

    int processing_finish(png_structp png_ptr, png_infop info_ptr);

    /* APNG decoder - end */

    /* APNG encoder - begin */
    void write_chunk(FILE * f, const char * name, unsigned char * data, unsigned int length);

    void write_IDATs(FILE * f, int frame, unsigned char * data, unsigned int length, unsigned int idat_size);

    void process_rect(unsigned char * row, int rowbytes, int bpp, int stride, int h, unsigned char * rows);

    void deflate_rect_fin(int deflate_method, int iter, unsigned char * zbuf, unsigned int * zsize, int bpp, int stride, unsigned char * rows, int zbuf_size, int n);

    void deflate_rect_op(unsigned char *pdata, int x, int y, int w, int h, int bpp, int stride, int zbuf_size, int n);

    void get_rect(unsigned int w, unsigned int h, unsigned char *pimage1, unsigned char *pimage2, unsigned char *ptemp, unsigned int bpp, unsigned int stride, int zbuf_size, unsigned int has_tcolor, unsigned int tcolor, int n);

    /* APNG encoder - end */
public:
    APNGOpt(/* args */);
    ~APNGOpt();

    int load_apng(void * buffer, long size, std::vector<APNGFrame>& frames, unsigned int & first, unsigned int & loops);

    size_t save_apng(long & buffer_ptr, std::vector<APNGFrame>& frames, unsigned int first, unsigned int loops, unsigned int coltype, int deflate_method, int iter);

    void optim_dirty(std::vector<APNGFrame>& frames);

    void optim_duplicates(std::vector<APNGFrame>& frames, unsigned int first);

    void optim_downconvert(std::vector<APNGFrame>& frames, unsigned int & coltype);

    void optim_image(std::vector<APNGFrame>& frames, unsigned int & coltype, int minQuality, int maxQuality);



private:
    unsigned char * op_zbuf1;
    unsigned char * op_zbuf2;
    z_stream        op_zstream1;
    z_stream        op_zstream2;
    unsigned char * row_buf;
    unsigned char * sub_row;
    unsigned char * up_row;
    unsigned char * avg_row;
    unsigned char * paeth_row;
    OP              op[6];
    rgb             palette[256];
    unsigned char   trns[256];
    unsigned int    palsize, trnssize;
    unsigned int    next_seq_num;
};
