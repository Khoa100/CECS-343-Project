import React, { Component } from 'react';

import Page from './../../components/Page';

class About extends Component {
  render() {
    return(
      <Page title="Dave's Bistro - About">
        <div className="content">
          <img src="/static/images/header/dave.jpg" alt="Dave"/>
          <div className="bio">
            <h1><i>It all started with a wish...</i></h1>
            <p>
              A wish to serve the best food with top-notch quality to hungry people
              While growing up, Dave cooked his family meals once a week as part of
              his chores and developed a love for cooking.
            </p>
            <p>
              In his leisure, he experimented with different ingredients and created
              his own personal dish. He called it “The LB Special House Burger”,
              with LB standing for Lovely Beef.
            </p>
            <p>
              Rumors of Dave’s new specialty dish spread quickly throughout his
              neighborhood. People would personally ask Dave to cook it for them
              and even offered to pay him.</p>
            <p>
              Dave realized that this was a sign… that this was just the beginning
              of achieving a dream. The dream: open his own restaurant where people
              can eat to their heart’s content and leave feeling satisfied.
            </p>
            <p>
              With the support of his family and friends, Dave graduated high school
              and went on to culinary school. There he created more of his signature
              dishes like the Chicken Marsala and made connections with people who also supported his dream. Finally, at the age of 27, Dave graduated from culinary school and started his business at Los Angeles.</p>
            <p>
              Today, Dave’s Bistro is located in two cities: Los Angeles, CA, and
              San Antonio, TX. Despite only having two locations, the popularity
              is increasing ten-fold. Tourists from all over the country line up
              to dine at what people are saying “one of the best dining spots ever”.
            </p>
            <p>
              Because of the employees who help create this extravagant dining
              experience and the guests who experience it, Dave’s dream will
              always live on.
            </p>
          </div>
        </div>
      </Page>
    );
  }
}

export default About;
