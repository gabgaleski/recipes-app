import React, { useContext } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import Context from '../context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';

function Carousel1() {
  const { recommendationMeals, recommendationDrinks } = useContext(Context);

  const magicNumberSix = 6;

  return (
    <Carousel className="container-carousel">
      {
        recommendationMeals.length > 0 ? recommendationMeals
          .slice(0, magicNumberSix).map((recommendation, index) => (
            <CarouselItem
              data-testid={ `${index}-recommendation-card` }
              key={ recommendation.idMeals }
            >
              <h2
                className="title-recommendation"
                data-testid={ `${index}-recommendation-title` }
              >
                {recommendation.strMeal}
              </h2>
              <img
                src={ recommendation.strMealThumb }
                alt={ recommendation.strArea }
              />

            </CarouselItem>
          ))
          : recommendationDrinks.slice(0, magicNumberSix)
            .map((recommendation, index) => (
              <CarouselItem
                key={ recommendation.idDrink }
                data-testid={ `${index}-recommendation-card` }
              >
                <h2
                  className="title-recommendation "
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recommendation.strDrink}
                </h2>
                <img
                  src={ recommendation.strDrinkThumb }
                  alt={ recommendation.strArea }
                  className="recommendationImage"
                />
              </CarouselItem>
            ))
      }
    </Carousel>
  );
}

export default Carousel1;
