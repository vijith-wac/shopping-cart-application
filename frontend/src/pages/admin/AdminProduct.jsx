import { useEffect, useState } from "react"
import AdminHeader from "../../components/admin/AdminHeader"
import { listAllProduct } from "../../services/admin/product"
import AdminProductList from "../../components/admin/AdminProductList"

const AdminProduct = ()=>{

    const token = localStorage.getItem('authToken')
    const[products,setProducts] = useState([])
    const getAllProduct = async()=>{
        try{
            const res = await listAllProduct(token)
            setProducts(res.products)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllProduct()
    },[])

    return(
        <div>
            <AdminHeader/>
            <h2>Admin Product</h2>
            <div className="container">
                <div className="row">
                {products?.map((product)=>{
                const{_id} = product
                return(
                    <div key={_id} className="col-4">
                        <AdminProductList product={product}/>
                    </div>
                )
            })}
                </div>
            </div>
           
        </div>
    )
}

export default AdminProduct