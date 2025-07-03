import type { UploadFile } from "antd/es/upload/interface";
type values = {
    title: string;
    category: string;
    description: string;
    price: string;
    image: string;
    size: string;

}

type postProduct = {
    values:values,fileList: UploadFile<any>[], setFileList: (value: React.SetStateAction<UploadFile<any>[]>) => void
}

export const ProductHooks = ()=>{
    const postProduct = async ({values,fileList, setFileList}:postProduct) => {
            if (!fileList.length) {
              return alert("Please upload an image.");
            }

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("cost", values.price); // match backend field
            values.size != ''&& formData.append("size", values?.size);
            formData.append("image", fileList[0].originFileObj as File);

            try {
                    const res = await fetch("http://localhost:5000/product", {
                        method: "POST",
                        body: formData, // FormData object
                    });

                    if (!res.ok) {
                        throw new Error(`Server responded with status ${res.status}`);
                    }

                    const data = await res.json();
                    console.log("Product added:", data);
                    // resetForm();
                    setFileList([]);
                    alert("Product uploaded successfully!");
                } catch (error) {
                console.error("Upload failed:", error);
                alert("Upload failed");
                }

          }

          return{postProduct}
}