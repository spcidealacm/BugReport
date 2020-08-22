if [ ! -d "./SVF-example" ]; then
    git clone https://github.com/SVF-tools/SVF-example.git
fi

cd SVF-example

cmake .
make

if [ -f /usr/bin/svf-ex  ]; then
    sudo rm /usr/bin/svf-ex
fi
sudo mv ./bin/svf-ex /usr/bin/

cd ..
## warning
function highlight(){
    echo -e "\033[1;45;37m$1\033[0m"
}
highlight "[COMPILE JOB DONE.]"
