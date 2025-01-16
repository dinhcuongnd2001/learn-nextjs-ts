'use client'
import useAxiosProtected from "@/hooks/useAxiosProtected";
import { IUser } from "@/interfaces";

export default function Home() {
  
  const {axiosProtected} = useAxiosProtected();
  

  const handleClick = async () => {
    const data = await axiosProtected<any, IUser>({
      "url": "users/my-info",
      method: "GET"
    })

    console.log('data :',data.result?.firstName);
  }

  return (
    <div>
      This is the homepage
      <div>
        <button onClick={handleClick} className="form-btn">
          Test
        </button>
      </div>
    </div>
  );
}
