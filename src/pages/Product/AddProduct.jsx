import React, { useState } from 'react'
import { Header } from '../../components'
// import { useParams } from 'react-router-dom';
import { TextField, styled, Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import toast from 'react-hot-toast'
import HttpClient from '../../components/HttpClient';
// import ReactSelect from 'react-select'
import Select from 'react-select';


<script src="https://cdn.jsdelivr.net/gh/habibmhamadi/multi-select-tag/dist/js/multi-select-tag.js"></script>

const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px 35px;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background-color: rgb(3, 201, 215);
  height: 48px;
  border-radius: 2px;
`;
const AddProduct = () => {

    const [categoryData , setCategorydata] = useState([]);
    const [subCategoryData , setSubCategoryData] = useState([]);
    const [subSubCategoryData , setSubSubCategoryData] = useState([]);
    const [colorData , setColorData] = useState([]);
    const [brandData , setBrandData] = useState([]);
    // const [variantData , setVarientData] = useState([]);
    // let variantData = [];

    const [selectedOption, setSelectedOption] = useState(null);
    const [colorOption , setColorOption] = useState(null);


    console.log("selectedOption" , selectedOption);

    // console.log("VarientData" , variantData);
    const [productName , setProductName]= useState('');
    const [image , setImage] = useState('');
    const [description , setDescription] = useState('');
    
    const [categoryId , setCategoryId] = useState('');
    const [subCategoryId , setSubCategoryId] = useState('');
    const [subSubCategoryId , setSubSubCategoryId] = useState('');
    const [varients , setVarient] = useState('')
    const [colorId , setColorId] = useState('');
    const [brandId , setBrandId] = useState('');

    const [hide , setHide] = useState(true);
    const [hide1 , setHide1] = useState(true);
    const [hide3 , setHide3] = useState(true);

    const [discountPrice , setDiscountPrice] = useState('');
    const [weight , setWeight] = useState('');

    const [Price , setPrice] = useState();
    const [quantity , setQuantity] = useState();
    const [option,setOption]=useState([])




    // const [preview , setPreview] = useState('');
  

    const imageHandler = async (e) => {
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image",file);
        let result = await HttpClient.fileUplode("upload-Sub-Sub-Catimage", "POST", data);
        console.log("IMAGE", result);
    
        if (result && result.status) {
          toast.success("Image upload Successfully");
          setImage(result.image);
        } else {
          console.log("Failed to upload image!");
        }
    }

    useEffect(() => {
        fetchCategoryData();
        fetchSubCategoryData();
        fetchSubSubCategory();
        fetchColorData();
        fetchBrandData();
        fetchVarient()
    },[]);

    const fetchCategoryData = async() => {
        let result  = await HttpClient.requestData("viewCategory", "GET");
        console.log("CategoryData" , result);
        if(result && result.status){
          setCategorydata(result?.data);
        }else{
          toast.error('Error to fetch Category Data')
        }
      }

      const fetchSubCategoryData = async () => {
        let result =await HttpClient.requestData("viewSubCategory" , "GET");
        console.log("SubCategoryData" , result);
        if(result && result.status){
            setSubCategoryData(result?.data);
        }else{
            toast.error("Failed to Fetch SubCategory Data")
        }
    }

    const fetchSubSubCategory = async() => {
        let result =await HttpClient.requestData("viewSubSubCategory" , "GET");
        console.log("SubSubCategoryData" , result);
        if(result && result.status){
            setSubSubCategoryData(result?.data);
        }else{
            toast.error("Failed to Fetch SubCategory Data")
        }
    }

    const fetchColorData = async () => {
        let result = await HttpClient.requestData("view-Color" , "GET");
        console.log("ResultColor", result);
        if(result && result.status){
          let arr = [];
            result?.data.forEach((item) => {
              arr.push({
                label:item?.name,
                value:item?._id
              })
            })
            setColorData(arr);
        }else{
            toast.error("Failed to Fetch color Data")
        }
    }

    const fetchBrandData = async () => {
        let result = await HttpClient.requestData("view-Brand-name" , "GET");
        console.log("ResultBrand", result);
        if(result && result.status){
            setBrandData(result?.data)
        }else{
            toast.error("Failed to Fetch color Data")
        }
    }

    const handleCategory = (e) => {
        setCategoryId(e.target.value);
        if(categoryId == ""){
            setHide(false) ;
        }
            else{
                setHide(true)
                setHide1(true);
            }

        // {categoryId == "" ? ( setHide(false) setHide1(false) ): setHide(true)}
    }

    const fetchVarient = async() => {
      let result = await HttpClient.requestData("view-Varient" , "GET");
      console.log("ResultVarient", result);
      if(result && result.status){

        let arr=[];
        result.data.forEach(item => {
          arr.push({
            label:item.varient,
            value:item._id
          })
        });
        setOption(arr)


      }else{
          toast.error("Failed to Fetch Variant Data")
      }
    }

    const handleSubCategory = (e) => {
        setSubCategoryId(e.target.value);
        {subCategoryId === "" ? setHide1(false) :setHide1(true)}
    }

    const handleSubSubCategory = (e) => {
        setSubSubCategoryId(e.target.value);
        {subSubCategoryId == "" ? setHide3(false) : setHide3(true)}
    }

    // const varient = () => {
    
    //   variantData.map((item) => {
    //     return(
    //       <option id={item?._id}  value={item?._id}>{item?.varient}</option>
    //       // value={item}
    //     );
  
    //   })
  
    // }

    const onHandleVarient = (e) => {

      // setVarient(e.target.value)

      console.log("values",e.target.value);

    }

    // const options = [
    //   { value: 'chocolatessssssss', label: 'Chocolate' },
    //   { value: 'strawberry', label: 'Strawberry' },
    //   { value: 'vanilla', label: 'Vanilla' },
    // ];


  return (
    <>
             <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Add Product" />
            <Wrapper>
            {/* <label for="cars">Choose a category:</label> */}
  <select style={{height: '58px' , borderRadius:'5px' , marginBottom:'24px'}} id="category" name="category" value={categoryId} onChange={(e)=> handleCategory(e)}>
    <option value={''}>Select a Category.......</option>
    {categoryData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.catName}</option>
      )
    })}
    
  </select>
  <select style={{height: '58px' ,marginBottom:'24px', borderRadius:'5px'}} disabled={hide} id="category" name="category" value={subCategoryId} onChange={(e)=> handleSubCategory(e)}>
    <option value={''}>Select a SubCategory.......</option>
    {subCategoryData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.subcatName}</option>
      )
    })}
    
    
  </select>

  <select style={{height: '58px' , borderRadius:'5px' , marginBottom:'24px'}} disabled={hide1}  id="category" name="category" value={subSubCategoryId} onChange={(e)=> handleSubSubCategory(e)}>
    <option value={''}>Select a SubSubCategory.......</option>
    {subSubCategoryData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.subSubCatName}</option>
      )
    })}
    
  </select>

  {/* <select style={{height: '58px' , borderRadius:'5px' , marginBottom:'24px'}} disabled={hide1}   name="color" value={colorId} onChange={(e)=> setColorId(e.target.value)}>
    <option value={''}>Select a Color.......</option>
    {colorData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.name}</option>
      )
    })}
    
  </select> */}

  <select style={{height: '58px' , borderRadius:'5px' , marginBottom:'24px'}} disabled={hide1} name="brand" value={brandId} onChange={(e)=> setBrandId(e.target.value)}>
    <option value={''}>Select a Brand.......</option>
    {brandData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.name}</option>
      );

    })}
  </select>

  {/* <select style={{height: '58px' , borderRadius:'5px' , marginBottom:'24px'}}  name="brand" value={brandId} onChange={(e)=> setBrandId(e.target.value)}>
    <option value={''}>Select  Varient.......</option>
    {variantData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.varient}</option>
      );

    })}
    
    
  </select> */}

{/* 
  <script>
    new MultiSelectTag('varient')  // id
</script> */}



          <TextField type="text"  label="Product Name" disabled={hide3} value={productName} variant="filled" onChange={(e) => setProductName(e.target.value)} />
          <TextField type="text"  label="Description" disabled={hide3} value={description} variant="filled" onChange={(e) => setDescription(e.target.value)} />
          <TextField style={{paddingBottom: '11px'}} disabled={hide3} type="file" id="images" onChange={imageHandler}  variant="filled" /> 
          <TextField style={{paddingBottom: '11px'}} label="Discount Price" disabled={hide3} type="input"  value={discountPrice} onChange={(e)=>setDiscountPrice(e.target.value)}  variant="filled" />
          <TextField style={{paddingBottom: '11px'}} label="Weight" disabled={hide3} type="input"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />

          <div>

          <TextField style={{paddingBottom: '11px' , marginRight:'98px'}} label="Length" disabled={hide3} type="number"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />
          <TextField style={{paddingBottom: '11px' , marginRight:'98px'}} label="Breadth" disabled={hide3} type="number"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />
          <TextField style={{paddingBottom: '11px' , marginRight:'98px'}} label="Height" disabled={hide3} type="number"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />

          <TextField style={{paddingBottom: '11px' , marginRight:'98px'}} label="Price" disabled={hide3} type="number"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />
          <TextField style={{paddingBottom: '11px' , marginRight:'98px'}} label="Quantity" disabled={hide3} type="number"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />

          </div>
          {image && <img style={{ height: '30%', width: '30%' , borderRadius:'9px' }} src={image} />}
          <label>Select Varient</label>
          <Select className='selectOption' options={option} value={selectedOption}  onChange={setSelectedOption} isMulti />
          <label>Select Color</label>
          
          <Select className='selectOption' options={colorData} value={colorOption}  onChange={setColorOption} isMulti />
          
          <LoginButton variant="contained">
            Add Product
          </LoginButton>

        </Wrapper>
            </div>
    </>
  )
}

export default AddProduct