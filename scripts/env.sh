PROJECTHOME=$(pwd)
sysOS=`uname -s`
install_path=$1

flag=0
if [ -L $install_path/SVF ]; then
    let flag++
    echo "["$flag"]REMOVE OLD SVF LINK.."
    rm -rf $install_path/SVF
fi

if [ -L $install_path/SVF ]; then
    let flag++
    echo "["$flag"]REMOVE OLD SVF LINK.."
    rm -rf $install_path/SVF
fi

echo "["$flag"]BUILD NEW LINK.."
if [[ $sysOS == "Darwin" ]]
then 
    ln -s $install_path/lib/SVF-osx $install_path/SVF
    export SVF_DIR=$install_path/SVF/
elif [[ $sysOS == "Linux" ]]
then 
    ln -s $install_path/lib/SVF-linux $install_path/SVF
    export SVF_DIR=$install_path/SVF/
fi 
let flag++
echo "["$flag"]LLVM_DIR="$sysOS
let flag++
echo "["$flag"]SVF_DIR="$SVF_DIR