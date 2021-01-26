
#include <stdlib.h>
#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include <emscripten/wire.h>
#include <emscripten/bind.h>
#include "apngopt/apngopt.cpp"


using namespace emscripten;

void loadAPNG(char * szIn, std::vector<APNGFrame> frames, long first, long loops) {
    load_apng(szIn, frames, reinterpret_cast<unsigned int &>(first), reinterpret_cast<unsigned int &>(loops));
}


EMSCRIPTEN_BINDINGS(apng_optimizer_module) {
    value_object<APNGFrame>("APNGFrame");


    function("loadAPNG", &loadAPNG, allow_raw_pointers());

    register_vector<APNGFrame>("APNGFrames");
}

