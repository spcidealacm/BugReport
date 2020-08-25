clang -c -g -S -fno-discard-value-names -emit-llvm $1 -o ${1%%.*}.bc
function highlight() {
    echo -e "\033[1;45;37m$1\033[0m"
}
function errorshow() {
    echo -e "\033[1;41;37m$1\033[0m"
}
folder="Graph_Files"
if [ -d ${folder} ]; then
    sudo rm -rf ${folder}
fi
if [ -f ${1%%.*}.bc ]; then
    svf-ex ${1%%.*}.bc >${1%%.*}.log
    mkdir ${folder}
    mv *.dot ./${folder}/
    highlight "[COMPILE JOB DONE.]"
else
    errorshow "[COMPILE JOB ERROR.]"
fi
