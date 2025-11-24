import React from 'react';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const products = [
    {
        name: "Apple Airpods",
        price: "$20.35",
        originalPrice: "$35.43",
        dealPrice: "$38",
        image: "../assets/images/dashboard-2/product/8.png",
        days: 20,
        hours: 5,
        minutes: 30,
        seconds: 15
    },
    {
        name: "Apple Watch Series 7",
        price: "$25.30",
        originalPrice: "$45.40",
        dealPrice: "$25",
        image: "../assets/images/dashboard-2/product/9.png",
        days: 15,
        hours: 6,
        minutes: 18,
        seconds: 30
    },
    {
        name: "IPhone 14 Pro",
        price: "$21.45",
        originalPrice: "$65.40",
        dealPrice: "$48",
        image: "../assets/images/dashboard-2/product/7.png",
        days: 28,
        hours: 3,
        minutes: 14,
        seconds: 45
    }
];

const itemTemplate = (product) => {
    return (
        <div className="special-offer">
            <div className="d-flex">
                <div className="flex-shrink-0">
                    <h3>{product.name}</h3>
                    <h5>
                        {product.price}
                        <del>{product.originalPrice}</del>
                    </h5>
                    <h6 className="bg-light">Special Discount</h6>
                    <p>Deal of the Day From <span>{product.dealPrice}</span></p>
                    <ul>
                        <li>
                            <h5>{product.days}</h5><span>Days</span>
                        </li>
                        <li>
                            <h5>{product.hours}</h5><span>Hours</span>
                        </li>
                        <li>
                            <h5>{product.minutes}</h5><span>Min</span>
                        </li>
                        <li>
                            <h5>{product.seconds}</h5><span>Sec</span>
                        </li>
                    </ul>
                </div>
                {/* <img src={product.image} alt={product.name} /> */}
            </div>
            <div className="product-slider">
                <div className="shap-block">
                    <div className="rounded-shap animate-bg-secondary">
                        <i></i><i></i><i></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DiscountCard = () => {
    return (
        <div className="col-xl-12 pe-0">
            <div className="card discount-card">
                <div className="card-body">
                    <Carousel value={products} itemTemplate={itemTemplate} numVisible={1} numScroll={1} />
                </div> 
            
            </div>
        </div>
    ); 
};

export default DiscountCard;
