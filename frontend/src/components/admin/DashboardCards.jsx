import { FcBusinessman,FcShop,FcShipped } from "react-icons/fc";
const DashboardBordCards = ({background,size,label,count})=>{
return(
    <div className="container">
        <div className={`row ${background}`}>
         <div className="col-md-4 ">
            {label==='Total Users'?
            <FcBusinessman size={size}/>:null    
        }
        {label === 'Total Products'?
         <FcShop  size={size}/>:null}
         {label==='Total Orders'?
         <FcShipped size={size}/>:null
         }
            </div>   
            <div className="col-md-7">
                
                    <h6>{label}</h6>
                <span>{count}</span>

            </div>
        </div>
    </div>
)
}

export default DashboardBordCards