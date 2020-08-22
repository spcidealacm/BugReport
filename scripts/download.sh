if [ -d "./SVF-example" ]; then
    rm -rf ./SVF-example
fi

git clone https://github.com/SVF-tools/SVF-example.git

function highlight(){
    echo -e "\033[1;45;37m$1\033[0m"
}
highlight "[COMPILE JOB DONE.]"