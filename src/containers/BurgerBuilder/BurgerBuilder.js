import React from 'react';
import { Wrap } from '../../hoc/exports.js';
import { Burger, BurgerConstructor, Message, Modal, ModalCheckout, Footer } from '../../components/exports.js';

class BurgerBuilder extends React.Component
{
    state = {
        ingredients: [
            {name: 'salad', price: 2},
            {name: 'meat', price: 1.5},
            {name: 'cheese', price: 5},
            {name: 'bacon', price: 3},
        ],
        currentBurger: [],
        limitIngredients: 40,
        limit: false,
        price: 0,
        modal: false,
        checkout: [
            { label: 'Name', type: 'text' },
            { label: 'Phone', type: 'text' },
            { label: 'Postal Code', type: 'text' },
        ]
    }

    checkoutSubmitHandler()
    {
        console.log('Checkout submitted');
        this.toggleModalHandler();
        this.reset();
    }

    setLimit(ingredients)
    {
        let limit = false;
        if(ingredients.length > this.state.limitIngredients)
        {
            limit = true;
        }
        return limit;
    }

    calculatePrice(ingredients)
    {
        let price = 0;
        for(let i = 0; i < ingredients.length; i++)
        {
            price += ingredients[i].price;
        }
        return price;
    }

    onDeleteHandler(index)
    {
        // set up ingredients
        let ingredients = this.state.currentBurger.filter((ingredient, key)=> {
            if(index !== key)
            {
                return true;
            }
            return false;
        });

        // set up price
        let price = this.calculatePrice(ingredients);

        // set up limit of ingredients
        let limit = this.setLimit(ingredients);

        this.setState({
            currentBurger: ingredients,
            price: price,
            limit: limit
        });
    }

    addIngredientHandler(index)
    {
        let ingredient = this.state.ingredients[index];
        let burger = this.state.currentBurger;
        let ingredients = burger.concat([ingredient]);
        let limit = this.setLimit(ingredients);
        let price = this.calculatePrice(ingredients);

        this.setState({
            currentBurger: ingredients,
            price: price,
            limit: limit
        });
    }

    reset()
    {
        this.setState({
            currentBurger: [],
            price: 0,
            limit: false
        })
    }

    toggleModalHandler()
    {
        let modal = this.state.modal;
        this.setState({
            modal: !modal
        })
    }

    parseIngredients(ingredients)
    {
        let result = [];
        for(let i = 0; i < ingredients.length; i++)
        {
            let container = {};
            let exists = false;
            for(let j = 0; j < result.length; j++)
            {
                if(result[j].name === ingredients[i].name)
                {
                    exists = j;
                }
            }

            if(exists !== false)
            {
                result[exists].count++ ;
            } else {
                container = {
                    name: ingredients[i].name,
                    count: 1,
                    price: ingredients[i].price
                };
                result.push(container)
            }
        }
        return result;
    }

    message = (
        <Message
            type={'error'}
            title={'Error!'}>You reached the limit of ingredients</Message>
    );

    render()
    {
        return (
            <Wrap>
                {(this.state.limit === true) ? this.message : null}
                <Burger
                    click={this.onDeleteHandler.bind(this)}
                    ingredients={this.state.currentBurger}/>
                <Footer>
                    <BurgerConstructor
                        ingredients={this.state.ingredients}
                        price={this.state.price}
                        limit={this.state.limit}
                        add={this.addIngredientHandler.bind(this)}
                        modal={this.toggleModalHandler.bind(this)}
                        reset={this.reset.bind(this)} />
                </Footer>
                <Modal
                    toggle={this.toggleModalHandler.bind(this)}
                    open={this.state.modal}>
                        <ModalCheckout
                            price={this.state.price}
                            fields={this.state.checkout}
                            submit={this.checkoutSubmitHandler.bind(this)}
                            currentBurger={this.parseIngredients(this.state.currentBurger)} />
                </Modal>
            </Wrap>
        );
    }
}

export default BurgerBuilder;
