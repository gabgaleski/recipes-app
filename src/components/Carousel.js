import React, { useContext } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';

function Carousel1() {
  const { recommendationMeals, recommendationDrinks } = useContext(Context);
  const magicNumberSix = 6;
  const location = useLocation();

  return (
    <Carousel className="container-carousel">
      {
        location.pathname.includes('drinks') ? recommendationMeals
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
              <Link to={ `/meals/${recommendation.idMeal}` }>
                <img
                  src={ recommendation.strMealThumb }
                  alt={ recommendation.strArea }
                />
              </Link>
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
                <Link to={ `/drinks/${recommendation.idDrink}` }>
                  <img
                    src={ recommendation.strDrinkThumb }
                    alt={ recommendation.strArea }
                    className="recommendationImage"
                  />
                </Link>
              </CarouselItem>
            ))
      }
    </Carousel>
  );
}

export default Carousel1;
