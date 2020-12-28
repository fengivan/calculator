
    let init=true;
    let input="";
    let numarr=[];
    let funcarr=[];
    let num="";
    let decimal=false;
    var keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('mousedown', click));
    keys.forEach(key => key.addEventListener('mouseup', rmcolor));

    function click(i)
    {
        if(init)
        {
            init=false;
            document.querySelector(".screen").innerHTML="";
        }
        this.classList.add('clicked');
        let input=this.dataset.key;

        if(input=="clear")
        {
            clear();
        }
        else if (input=="=")
        {   
            equals();
        }
        else if (input=="+/-")
        {   
            equals();
            numarr[0]=-numarr[0];
            document.querySelector(".screen").innerHTML=""+numarr[0];
        }
        else if (input=="1/x")
        {   
            equals();
            numarr[0]=1/numarr[0];
            document.querySelector(".screen").innerHTML=""+numarr[0];
        }
        else if (input=="x^2")
        {   
            equals();
            numarr[0]=Math.pow(numarr[0],2);
            document.querySelector(".screen").innerHTML=""+numarr[0];
        }
        else if (input=="sqrt(x)")
        {   
            equals();
            numarr[0]=Math.pow(numarr[0],.5);
            document.querySelector(".screen").innerHTML=""+numarr[0];
        }
        else if (input=="backspace")
        {   
            if(num=="")
            {
                clear();
            }
            else{
                if(num.charAt(num.length-1)=='.')
                    decimal=false;
                num=num.substring(0,num.length-1);
                document.querySelector(".screen").innerHTML=document.querySelector(".screen").innerHTML.substring(0,document.querySelector(".screen").innerHTML.length-1);
            }
        }
        
        else if (input=="%")
        {   
            equals();
            numarr[0]=numarr[0]/100;
            document.querySelector(".screen").innerHTML=""+numarr[0];
        }
        else if ((isNaN(input)&& !(input=="-" && numarr.length==0 && num.length==0)) && input!=".")
        {
            decimal=false;
            funcarr.push(input)
            if(num!="")
                numarr.push(num);
            num="";
            document.querySelector(".screen").innerHTML+=""+input;
        }
        else 
        {
            if(input==".")
            {
                if(decimal)
                    return;
                else
                    decimal=true;
            }
            if(document.querySelector(".screen").innerHTML=="0")
                document.querySelector(".screen").innerHTML=""
            
            if(!(num==""&& input =="0"))
            {
                num+=input;
                document.querySelector(".screen").innerHTML+=""+input;
            }
        }
    }



    function equals()
    {
        if(num!="")
            numarr.push(num);
        num="";
        let temp=process();
        document.querySelector(".screen").innerHTML=""+temp;
        numarr=[temp];
        funcarr=[];
        if(temp%1==0)
            decimal=false;
        else
            decimal=true;
    }

    function process()
    {
        let output=parseFloat(numarr[0]);
        for(let a=0; a<funcarr.length; a++)
        {
            if(funcarr[a]=='*')
                output*=parseFloat(numarr[a+1]);
            else if(funcarr[a]=='-')
                output-=parseFloat(numarr[a+1]);
            else if(funcarr[a]=='/')
                output/=parseFloat(numarr[a+1]);
            else
                output+=parseFloat(numarr[a+1]);
        }

        if(funcarr.length==0)
        {
            let sum=0;
            for(let x=0; x<numarr.length; x++)
            {
                sum+=parseFloat(numarr[x]);
            }
            return sum;
        }
        return output;
    }
    function rmcolor(i)
    {
        this.classList.remove('clicked');
    }
    function clear()
    {
        document.querySelector(".screen").innerHTML="0";
        input="";
        numarr=[];
        funcarr=[];
        num="";
        init=true;
        decimal=false;
    }
