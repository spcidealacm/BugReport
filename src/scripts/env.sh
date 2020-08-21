PROJECTHOME=$(pwd)
sysOS=`uname -s`
install_path=$1
# LLVMHome="llvm-10.0.0.obj"
# export LLVM_DIR=$install_path/$LLVMHome
# export PATH=$LLVM_DIR/bin:$PATH
# export PATH=$PROJECTHOME/bin:$PATH
if [[ $sysOS == "Darwin" ]]
then 
    ln -s $install_path/svf-lib/SVF-osx $install_path/SVF
    export SVF_DIR=$install_path/SVF/
elif [[ $sysOS == "Linux" ]]
then 
    ln -s $install_path/svf-lib/SVF-linux $install_path/SVF
    export SVF_DIR=$install_path/SVF/
fi 

echo "LLVM_DIR="$sysOS
echo "SVF_DIR="$SVF_DIR