#!/bin/bash

set -e

export OPTIMIZE="-O0"
export LDFLAGS="${OPTIMIZE}"
export CFLAGS="${OPTIMIZE}"
export CPPFLAGS="${OPTIMIZE}"

NAME="apng-optimizer"

echo "============================================="
echo "Start build APNG Optizmizer"
echo "============================================="
(
  emcc \
  --bind \
  ${OPTIMIZE} \
  -flto \
  --closure=0 \
  -s WASM=1 \
  -s ASSERTIONS=0 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s SAFE_HEAP=0 \
  -s ENVIRONMENT=web,worker \
  -s EXTRA_EXPORTED_RUNTIME_METHODS='["FS", "GL"]' \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s EXPORT_NAME=${NAME} \
  -s USE_ES6_IMPORT_META=0 \
  -I ./apngopt/7z \
  -I ./apngopt/libpng \
  -I ./apngopt/zlib \
  -I ./apngopt/zopfli \
  -I ../source/context \
  -I ../source/shape \
  -o ./src/wasm/${NAME}.js \
  ./binding.cpp \
  ./apngopt/7z/*.cc \
  ./apngopt/*.cpp \
  ./apngopt/libpng/*.c \
  ./apngopt/zlib/*.c \
  ./apngopt/zopfli/*.c \
)

echo "============================================="
echo "Compiling illusion module done"
echo "============================================="

#-s ASYNCIFY \
#-s ASSERTIONS=1 \
#-s WASM_MEM_MAX=1024MB \
#-s USE_PTHREADS=1 \
#-s PTHREAD_POOL_SIZE=5 \