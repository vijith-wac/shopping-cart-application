import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import DashboardBordCards from "../../components/admin/DashboardCards";
import RevenueChart from "../../components/admin/RevenueChart";
import { getAllOrders } from "../../services/order";
import { allUser } from "../../services/user";
import { listAllProduct } from "../../services/admin/product";

const Dashboard = () => {
    const token = localStorage.getItem('authToken')
    const [chartData, setChartData] = useState([["Date", "Revenue"]]);
    const [totalCount,setTotalCount] = useState({
        order:null,
        user:null,
        product:null
    })
    const fetchOrdersData = async () => {
        try {
          const response = await getAllOrders(token)
          setTotalCount((prevCount) => ({
            ...prevCount,
            order: response?.length,
          }));
          const revenueByDate = response.reduce((acc, order) => {
            const date = new Date(order.orderDate).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + order.totalAmount;
            return acc;
          }, {});

          const dynamicChartData = [["Date", "Revenue"], ...Object.entries(revenueByDate)];

          setChartData(dynamicChartData)

        } catch (err) {
          setError("Failed to fetch data");
        } 
      }
    const totalUsersCount=async()=>{
        try{
            const res = await allUser(token)
            setTotalCount((prevCount) => ({
                ...prevCount,
                user: res?.users?.length,
              }));
        }catch(error){
            console.log(error)
        }
    }
    const totalProductCount= async()=>{
        try{
            const res = await listAllProduct(token)
            setTotalCount((prevCount) => ({
                ...prevCount,
                product: res?.products?.length,
              }));
        }catch(error){
            console.log(error)
        }
    }

    
    useEffect(() => {
        
        fetchOrdersData();
        totalProductCount()
        totalUsersCount()
      }, []); 


  return (
    <div className="container">
      <AdminHeader />
      <div className="row mb-3">
        <div className="row mb-5">
          <div className="col-4">
            <DashboardBordCards background="bg-warning" size='3rem' label='Total Users' count={totalCount?.user}/>
          </div>
          <div className="col-4">
            <DashboardBordCards background="bg-success" size='3rem' label='Total Products' count={totalCount?.product} />
          </div>
          <div className="col-4">
            <DashboardBordCards background="bg-info" size='3rem' label='Total Orders' count={totalCount?.order} />
          </div>
        </div>
        <div className="col-6">
          <RevenueChart chartData={chartData}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
