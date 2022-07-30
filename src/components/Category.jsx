import React from 'react'
import { categoryData } from '../utils/constants'
import { Link } from "react-router-dom";

const CatData = (props) => {
    return (
        <div className="w-full md:w-64 ">
            <img className="h-40 mb-4 mx-auto"src={props.image} alt=""/>
            
            <div className="text-center">
                <h2 className="mb-4 font-bold text-lg"> {props.name} </h2>
                
                <div className="flex items-center justify-around mt-6 ">
                    <Link className='underline hover:text-blue-700' to={`/viewProduct/${props.name}`}> View All </Link>
                </div>

            </div>
        </div>
    )
}

const Category = () => {
  return (
    <section className="menu container mx-auto py-8 px-6 ">
        <h1 className="text-xl font-bold mb-8"> All Categories</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 gap-y-12">

                {categoryData.map((transaction, i) => (
                  
                  <> {i !== 0 && <CatData key={i} {...transaction}  /> } </>
                ))}
        </div>
        

    </section>
  )
}

export default Category