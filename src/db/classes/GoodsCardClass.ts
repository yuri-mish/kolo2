import {CatCard} from 'DB';


   
interface IGoodsCard extends CatCard  {
    priceValue?:number;
}


export const GoodsCard = () =>{

    const doc:IGoodsCard={
        id:'',
        class_name:'goods',
        priceValue:0}

}

