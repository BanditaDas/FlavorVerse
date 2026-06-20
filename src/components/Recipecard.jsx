import React from "react";
import styled from "styled-components";

function Recipecard({ recipe }) {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="bg">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-img"
          />

          <div className="content">
            <h3>{recipe.name}</h3>

            <p>
              {recipe.description?.slice(0, 60) || "Delicious homemade recipe"}
              ...
            </p>

            <button>View Details</button>
          </div>
        </div>

        <div className="blob" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 280px;
    height: 370px;
    border-radius: 14px;
    z-index: 1111;
    overflow: hidden;
    box-shadow:
      20px 20px 60px #bebebe,
      -20px -20px 60px #ffffff;
  }

  .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    z-index: 2;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    border-radius: 10px;
    overflow: hidden;
    outline: 2px solid white;

    display: flex;
    flex-direction: column;
  }

  .recipe-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .content {
    flex: 1;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.5rem;
  }

  .content p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .content button {
    width: 100%;
    border: none;
    padding: 0.8rem;
    border-radius: 10px;
    background: #b35839;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .content button:hover {
    transform: translateY(-2px);
    background: #99492f;
  }

  .blob {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-color: #b35839;
    opacity: 1;
    filter: blur(20px);
    animation: blob-bounce 5s infinite ease;
  }

  @keyframes blob-bounce {
    0% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }

    25% {
      transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }

    50% {
      transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }

    75% {
      transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }

    100% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
  }
`;

export default Recipecard;