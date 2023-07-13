import React, { useState } from 'react'
import { Header } from '../../components'
// import { useParams } from 'react-router-dom';
import { TextField, styled, Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import toast from 'react-hot-toast'
import HttpClient from '../../components/HttpClient';
// import ReactSelect from 'react-select'
import Select from 'react-select';
import { Padding } from '@mui/icons-material';


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
    const [variantData , setVarientData] = useState([]);
    const [multiple , setMultiple] = useState(false)
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
    const [hide3 , setHide3] = useState(false);

    const [discountPrice , setDiscountPrice] = useState('');
    const [weight , setWeight] = useState('');



    const [length , setLength] = useState();
    const [breadth , setBreadth] = useState();
    const [height , setHeight] = useState();
    const [Price , setPrice] = useState();
    const [quantity , setQuantity] = useState();
    const [option,setOption]=useState([]);

  let varientData = {
    varientId:'',
    price:'',
    quantity:''

  }

    const [data , setData] = useState([{varientData}]);




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
        
        if(categoryId == ""){
            setHide(false) ;
        }
            else{
                setHide(true)
                // setHide1(true);
            }

            setCategoryId(e.target.value);

        // {categoryId == "" ? ( setHide(false) setHide1(false) ): setHide(true)}
    }

    const fetchVarient = async() => {
      let result = await HttpClient.requestData("view-Varient" , "GET");
      console.log("ResultVarient", result);
      if(result && result.status){

        // let arr=[];
        // result.data.forEach(item => {
        //   arr.push({
        //     label:item.varient,
        //     value:item._id
        //   })
        // });
        // setOption(arr)

        setVarientData(result?.data);


      }else{
          toast.error("Failed to Fetch Variant Data")
      }
    }

    const handleSubCategory = (e) => {
      {subCategoryId === "" ? setHide1(false) :setHide1(true)};
        setSubCategoryId(e.target.value);
      
    }

    const handleSubSubCategory = (e) => {
     
        setSubSubCategoryId(e.target.value);
        // {subSubCategoryId  ? setHide3(true) : setHide3(false)}
        setHide3(true);
     
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

    const addProduct = () => {
        // let data = {
        //   productName:,
        //   image:,
        //   description:,
        //   catID:,
        //   subCatID:,
        //   subSubCatID:,
        //   secondaryVarientID:,
        //   brandID:,
        //   colorID:,
        //   primaryVarientID:[
        //     {
        //       id:,
        //       price:,
        //       quantity:,
        //     }
        //   ],
        //   unitID:,
        //   discountPrice:,
        //   weight:,
        //   dimension:[
        //     {
        //       length:,
        //       breadth:,
        //       height:,
        //     }
        //   ]
        // }
    }

  return (
    <>
             <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Add Product" />
            {/* <Wrapper>
            <label for="cars">Choose a category:</label>

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


  <select style={{height: '58px' , borderRadius:'5px' , marginBottom:'24px'}} disabled={hide1} name="brand" value={brandId} onChange={(e)=> setBrandId(e.target.value)}>
    <option value={''}>Select a Brand.......</option>
    {brandData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.name}</option>
      );

    })}
  </select>





          <TextField type="text"  label="Product Name" disabled={hide3} value={productName} onChange={(e) => setProductName(e.target.value)} />
          <TextField type="text"  label="Description" disabled={hide3} value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextField style={{paddingBottom: '11px'}} disabled={hide3} type="file" id="images" onChange={imageHandler}  variant="filled" /> 
          <TextField style={{paddingBottom: '11px'}} label="Discount Price" disabled={hide3} type="input"  value={discountPrice} onChange={(e)=>setDiscountPrice(e.target.value)}  variant="filled" />
          <TextField style={{paddingBottom: '11px'}} label="Weight" disabled={hide3} type="input"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />

          <div>

          <TextField style={{paddingBottom: '11px' , marginRight:'98px'}} label="Length" disabled={hide3} type="number"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />
          <TextField style={{paddingBottom: '11px' , marginRight:'98px'}} label="Breadth" disabled={hide3} type="number"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />
          <TextField style={{paddingBottom: '11px' setHide3(false), marginRight:'98px'}} label="Height" disabled={hide3} type="number"  value={weight} onChange={(e)=>setWeight(e.target.value)}  variant="filled" />

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

        </Wrapper> */}




<label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a category :</label>
<select class="form-select" aria-label="select category" value={categoryId} onChange={(e)=> handleCategory(e)}>
<option value={''}>Select a Category.......</option>
{categoryData.map((item , index) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.catName}</option>
      )
    })}
</select>


  <label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a sub category :</label>
<select class="form-select" aria-label="select category" disabled={hide} value={subCategoryId} onChange={(e)=> handleSubCategory(e)}>
<option value={''}>Select a SubCategory.......</option>
    {subCategoryData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.subcatName}</option>
      )
    })}
</select>

<label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a sub sub category :</label>
<select class="form-select" aria-label="select category" disabled={hide1} value={subSubCategoryId} onChange={(e)=> handleSubSubCategory(e)}>
<option value={''}>Select a subSubCategory.......</option>
    {subSubCategoryData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.subSubCatName}</option>
      )
    })}
</select>

{
  hide3 ? <>
          <label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a Brand :</label>
<select class="form-select" aria-label="select category"  value={brandId} onChange={(e)=> setBrandId(e.target.value)}>
<option value={''}>Select a brand.......</option>
    {brandData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.name}</option>
      )
    })}
</select>
<div>
  
</div>
<label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose Color :</label>
<Select  options={colorData} value={colorOption} onChange={setColorOption} isMulti />
          

<form>
<div class="form-group">
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Product Name</label>
    <input type="email" value={productName} onChange={(e) => setProductName(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product"/>
  </div>

  <div class="form-group" >
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Product Description</label>
    <input type="email" value={description} onChange={(e) => setDescription(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Description"/>
  </div>

  <div class="mb-2">
  <label for="formFile" style={{marginBottom:'12px' , fontSize:'15px'}} class="form-label">Upload Image :</label>
  <input id="images" onChange={imageHandler} disabled={hide} class="form-control" type="file" />
  {image && <img style={{ height: "15%", width: "15%" , marginTop:'12px' , borderRadius:'9px' }} src={image} />}
</div>

{/* <div class="form-group" >
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Discount Price</label>
    <input type="email" value={description} onChange={(e) => setDescription(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Description"/>
  </div>

  <div class="form-group" >
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Weight</label>
    <input type="email" value={description} onChange={(e) => setDescription(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Description"/>
  </div> */}


  <div class="row" style={{marginBottom:'21px'}}>
    <div class="col">
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Discount Price :</label>
    <input type="number" value={discountPrice} onChange={(e)=>setDiscountPrice(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Discount Price"/>
    </div>
    <div class="col">
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Weight : </label>
    <input type="number" value={weight} onChange={(e)=>setWeight(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter weight"/>
    </div>
  </div>

  <label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Box Size :</label>
  <div style={{marginBottom:'21px' , border:'0.01px solid #dee2e6' , padding:'13PX'}}>
    <div class="row" style={{marginBottom:'21px'}}>
      <div class="col">
      <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Length :</label>
      <input type="number" value={length} onChange={(e)=>setLength(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Length"/>
      </div>
      <div class="col">
      <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Breadth : </label>
      <input type="number" value={breadth} onChange={(e)=>setBreadth(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Breadth"/>
      </div>
      <div class="col">
      <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Height : </label>
      <input type="number" value={height} onChange={(e)=>setHeight(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Height"/>
      </div>
    </div>
  </div>


<div style={{display:"flex" , flexDirection:'row' ,}}>
  <div style={{  marginBottom:'21px' , border:'0.01px solid #dee2e6' , padding:'13PX'}}> 

      <label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a varient :</label>
      <select class="form-select" aria-label="select category" value={categoryId} onChange={(e)=> handleCategory(e)}>
      <option value={''}>Select a Varient.......</option>
      {variantData.map((item , index) => {
          return(
            <option id={item?._id}  value={item?._id}>{item?.varient}</option>
          )
        })}
      </select>

      <div class="row" style={{marginBottom:'21px'}}>
        <div class="col">
        <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Price :</label>
        <input type="number" value={Price} onChange={(e)=>setPrice(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price"/>
        </div>
        <div class="col">
        <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Quantity : </label>
        <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter quantity"/>
        </div>
      </div>
</div>

  <div onClick={() => setMultiple(true)}  style={{margin:'102px 77px' }}><svg style={{ height:'30px' ,  width:'30px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
</svg>
</div>
  </div>
{/* 
  {
    data.map((item , index) => {
      return(
        <>
            <div style={{  marginBottom:'21px' , border:'0.01px solid #dee2e6' , padding:'13PX'}}> 

<label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a varient :</label>
<select class="form-select" aria-label="select category" value={categoryId} onChange={(e)=> handleCategory(e)}>
<option value={''}>Select a Varient.......</option>
{variantData.map((item , index) => {
    return(
      <option id={item?._id}  value={item?._id}>{item?.varient}</option>
    )
  })}
</select>

<div class="row" style={{marginBottom:'21px'}}>
  <div class="col">
  <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Price :</label>
  <input type="number" value={Price} onChange={(e)=>setPrice(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price"/>
  </div>
  <div class="col">
  <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Quantity : </label>
  <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter quantity"/>
  </div>
</div>
</div>
        </>
      )
    })
  
  } */}

{/* {
  multiple ? <>
    <div style={{display:"flex" , flexDirection:'row' ,}}>
  <div style={{  marginBottom:'21px' , border:'0.01px solid #dee2e6' , padding:'13PX'}}> 

      <label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a varient :</label>
      <select class="form-select" aria-label="select category" value={categoryId} onChange={(e)=> handleCategory(e)}>
      <option value={''}>Select a Varient.......</option>
      {variantData.map((item , index) => {
          return(
            <option id={item?._id}  value={item?._id}>{item?.varient}</option>
          )
        })}
      </select>

      <div class="row" style={{marginBottom:'21px'}}>
        <div class="col">
        <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Price :</label>
        <input type="number" value={Price} onChange={(e)=>setPrice(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price"/>
        </div>
        <div class="col">
        <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Quantity : </label>
        <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter quantity"/>
        </div>
      </div>
</div>

  <div  style={{margin:'102px 77px' }}>
</div>
  </div>
  </>:null
} */}


  <button  class="btn btn-primary" style={{backgroundColor:'rgb(3, 201, 215)'}} onClick={addProduct} >Add Product</button>
  </form>

  </> :
  null
}

            </div>
    </>
  )
}

export default AddProduct