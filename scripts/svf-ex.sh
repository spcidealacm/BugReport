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
echo "THE WORK DONE."
