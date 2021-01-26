
#include <stdlib.h>
#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include <emscripten/wire.h>
#include <emscripten/bind.h>
#include "apngopt/apngopt.cpp"

using namespace emscripten;

struct Options {
    int deflate_method = 1;
    int iter = 15;
};

int main() { }

int optAPNG(std::string szInput, std::string szOut, Options options) {
    unsigned int first, loops, coltype;
    std::vector<APNGFrame> frames;

    int res = load_apng(szInput.c_str(), frames, first, loops);
    if (res >= 0)
    {
        optim_dirty(frames);
        optim_duplicates(frames, first);
        optim_image(frames, coltype);
        // optim_downconvert(frames, coltype);

        save_apng(szOut.c_str(), frames, first, loops, coltype, options.deflate_method, options.iter);
    }

    for (size_t j=0; j<frames.size(); j++)
    {
        delete[] frames[j].rows;
        delete[] frames[j].p;
    }
    frames.clear();

    return res;
}


EMSCRIPTEN_BINDINGS(apng_optimizer_module) {
    value_object<Options>("Options")
        .field("deflate_method", &Options::deflate_method)
        .field("iter", &Options::iter);


    function("optAPNG", &optAPNG);
}

