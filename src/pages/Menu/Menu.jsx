import React, { Component } from 'react';

import Page from './../../components/Page';

const MenuItem = (props) => {
  return(
    <div>
      <img src={props.src} alt={props.caption} className="food"/>
      <div className="middle">
        <div className="text">
          {props.text}
        </div>
      </div>
      <div className="caption">
        {props.caption}
      </div>
    </div>
  );
}

class Menu extends Component {
  render() {
    return(
      <Page title="Dave's Bistro - Menu">
        <div className="content">
          <img src="/static/images/header/menu_header.jpg" alt="Menu"/>
          <h1>Entrées</h1>
          <div className="menu-grid">
            <MenuItem
              src="/static/images/foods/food_lbburger.jpg"
              text="Charcoal roasted beef braised in our house special bourbon sauce."
              caption="LB House Special Burger"
              />
            <MenuItem
              src="/static/images/foods/food_fish.jpg"
              text="Tender baked fish fillet served with our seasonal lemon butter sauce."
              caption="Fish in Lemon Butter Sauce"
              />
            <MenuItem
              src="/static/images/foods/food_dish.jpg"
              text="Grilled salmon served on a bed of crispy rice."
              caption="Salmon on Crispy Rice"
              />
            <MenuItem
              src="/static/images/foods/food_mushroomchicken.jpg"
              text="Golden brown chicken and mushrooms paired with an Italian wine crafted Marsala sauce."
              caption="Chicken Marsala"
              />
            <MenuItem
              src="/static/images/foods/food_spaghetti.jpg"
              text="A classic pasta dish topped with savory tomato sauce and ground beef."
              caption="Spaghetti"
              />
            <MenuItem
              src="/static/images/foods/food_lasagna.jpg"
              text="Baked with juicy tomatoes, corn, zucchini, and bell peppers, and topped with cashew ricotta and fresh basil."
              caption="Summer Lasagna"
              />
          </div>
          <h1>Side Dishes</h1>
          <div className="menu-grid">
            <MenuItem
              src="/static/images/foods/food_salad2.jpg"
              text="Baby greens, chickpeas, and pepitas tossed together with hard boiled eggs and sliced avocados."
              caption="California Classic Salad"
              />
            <MenuItem
              src="/static/images/foods/food_salad1.jpg"
              text="Clams tossed with various greens and drizzled with vinaigrette."
              caption="Clam Salad"
              />
            <MenuItem
              src="/static/images/foods/food_mozzsticks.jpg"
              text="Baked mozzarella sticks served with your sauce of choice."
              caption="Mozzarella Sticks"
              />
            <MenuItem
              src="/static/images/foods/food_eggmuffin.jpg"
              text="Breakfast favorites loaded with peppers, spinach, and veggies. Served with a side of fruit."
              caption="Egg Muffins"
              />
            <MenuItem
              src="/static/images/foods/food_clamchowder.jpg"
              text="A hearty soup flavored with bacon, leeks, onions, and potatoes."
              caption="Clam Chowder"
              />
            <MenuItem
              src="/static/images/foods/food_friedshrimp.jpg"
              text="Shrimp coated in crunchy fried batter."
              caption="Fried Shrimp"
              />
          </div>
          <h1 id="desserts">Desserts &amp; Drinks</h1>
          <div className="menu-grid">
            <MenuItem
              src="/static/images/foods/food_chocovolcano.jpg"
              text="Chocolate lava cake sprinkled with powdered sugar."
              caption="Chocolate Lava Cake"
              />
            <MenuItem
              src="/static/images/foods/food_vanillaisland.jpg"
              text="Vanilla sponge cake with cream filling topped with chocolate shavings."
              caption="Vanilla Island Cake"
              />
            <MenuItem
              src="/static/images/foods/food_creampuff.jpg"
              text="Small yet delicious pastries packed with cream and served with strawberries."
              caption="Cream Puffs"
              />
            <MenuItem
              src="/static/images/foods/food_blueberrymilkshake.jpg"
              text="Blueberry milkshake topped with vanilla ice cream, maple syrup, and muffin crumbs."
              caption="Blueberry Milkshake"
              />
            <MenuItem
              src="/static/images/foods/food_smoothie.jpg"
              text="A tasty and nutritious blend of chilled strawberries, pineapple, and kiwi."
              caption="Tropical Smoothie"
              />
            <MenuItem
              src="/static/images/foods/food_rasplemonade.jpg"
              text="Our signature naturally sweetened raspberry lemonade."
              caption="Raspberry Lemonade"
              />
          </div>
        </div>
      </Page>
    );
  }
}

export default Menu;
