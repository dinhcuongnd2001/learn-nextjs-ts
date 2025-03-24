"use client"
import TableComponent from "@/components/ui/table";
import useAxiosProtected from "@/hooks/useAxiosProtected";
import { Pagination, Product, ProductQueryParams } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ProductManagerPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const {axiosProtected} = useAxiosProtected();
  const router = useRouter();

  useEffect(() => {
    getProduct();
  }, [page])

  const rows = useMemo(() => {
    return products.map(({productVariations, ...rest}) => rest)
  }, [products])

  const getProduct = async () => {
    const data = await axiosProtected<ProductQueryParams, Pagination<Product>>({
      url: 'products/get',
      method: 'POST',
      data: {
        pageNo: page,
        pageSize: 20,
      },
    });
    setProducts(data.result?.list || []);

  }

  const onChangePage = (current: number) => {
    setPage(current);
  };

  const handleClickCreate = () => {
    router.push('/admin/product/create')
  }

  return <>
      <TableComponent
        caption="Product Manager"
        rows={rows}
        cols={[
          { key: 'name', title: 'Name' },
          { key: 'description', title: 'Description' },
          { key: "baseCost", title: "Base cost ($)"},
          { key : "thumbnail", title: "Thumbnail", type:"images"},
          
        ]}
        pagination={{ current: page, totalPage: totalPage, onChangePage: onChangePage }}
        delete={true}
        update={true}
        create={true}
        // handleClickDelete={handleClickDelete}
        // hanleClickUpdate={handleClickUpdate}
        handleClickCreate={handleClickCreate}
      />
      {/* <RoleUpdate open={openUpdate} setOpen={status => setOpenUpdate(status)} roleId={currentId} />
      */}
    </>
}
