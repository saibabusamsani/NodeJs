function add(a,b)
{
    return a+b;
}
function sub(a,b)
{

    return a-b;
}
function prime(n,i)
{
    if(i*i>n) return true;
    if(n%i==0) return false;
    return prime(n,i+1);
   
}
module.exports={add,sub,prime};