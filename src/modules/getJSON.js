"use strict";

const getData = async () => {
  const blockForRender = document.querySelector(".row");
  const filterBlock = document.querySelector(".filter-option");
  let result = [];

  await fetch("https://test-a02e8-default-rtdb.firebaseio.com/db.json")
    .then((response) => response.json())
    .then((json) => {
      let jsonFormat = json;
      console.log(jsonFormat);

      const getUndefined = () => {
        const heroBlockParagraphs = document.querySelectorAll(".hero p");

        heroBlockParagraphs.forEach((el) => {
          let elTextContent = el.textContent.replace(/undefined/g, "~");
          return (el.textContent = elTextContent);
        });
      };

      const render = (el) => {
        const hero = {
          actors: el.actors,
          citizenship: el.citizenship,
          birthDay: el.birthDay,
          deathDay: el.deathDay,
          gender: el.gender,
          movies: el.movies,
          name: el.name,
          photo: el.photo,
          species: el.species,
          status: el.status,
          realName: el.realName,
        };

        let heroBlock = document.createElement("div");
        heroBlock.classList.add("hero");

        heroBlock.innerHTML = `<div class='hero-photo' style="background: url('${hero.photo}') center center no-repeat;"></div><div class='hero-name'><p>Актер: ${hero.actors}</p> </div><div class='hero-realname'><p>Настоящее имя: ${hero.realName}</p> </div><div class='hero-citizenship'><p>Гражданство: ${hero.citizenship}</p> </div><div class='hero-birthday'><p>Год рождения: ${hero.birthDay}</p> </div><div class='hero-deathDay'><p>Год смерти: ${hero.deathDay} </p></div><div class='hero-gender'><p>Пол: ${hero.gender}</p> </div><div class='hero-movies'><p>Фильмография: ${hero.movies}</p></div><div class='hero-name'><p>Герои: ${hero.name}</p></div><div class='hero-species'><p>Тип: ${hero.species}</p> </div><div class='hero-status'><p>Статус: ${hero.status}</p.> </div>`;

        blockForRender.append(heroBlock);
      };

      const renderAsideBtns = () => {
        jsonFormat.forEach((item) => {
          if (item.hasOwnProperty("movies")) {
            item["movies"].forEach((key) => {
              result.push(key);
            });
          }
        });
        const uniqueBtns = result.reduce((key, item) => {
          if (key.hasOwnProperty(item)) {
            key[item]++;
          } else {
            key[item] = 1;
          }
          return key;
        }, {});

        for (let key in uniqueBtns) {
          let movieOption = document.createElement("div");
          let movieOptionName = document.createElement("div");
          movieOptionName.classList.add("movie-name");
          movieOptionName.textContent = key;
          movieOption.append(movieOptionName);

          let quantityBlock = document.createElement("div");
          quantityBlock.classList.add("quantity");
          quantityBlock.innerText = uniqueBtns[key];
          movieOption.append(quantityBlock);

          filterBlock.append(movieOption);
        }
      };

      const renderFilteredItems = () => {
        const filterOptions = filterBlock.querySelectorAll(".movie-name");

        filterOptions.forEach((filter) => {
          filter.addEventListener("click", (e) => {
            let filterName = e.target.textContent;
            console.log(filterName);
            blockForRender.innerHTML = "";
            jsonFormat.forEach((elem) => {
              if (elem.hasOwnProperty("movies")) {
                elem["movies"].forEach((key) => {
                  if (filterName === key) {
                    let selectedIndex = jsonFormat.indexOf(elem);

                    fetch(
                      `https://test-a02e8-default-rtdb.firebaseio.com/db/${selectedIndex}.json`
                    )
                      .then((response) => response.json())
                      .then(() => {
                        render(elem);
                        getUndefined();
                      });
                  }
                });
              }
            });
          });
        });
      };

      jsonFormat.forEach((item) => {
        render(item);
        getUndefined();
      });

      renderAsideBtns();
      renderFilteredItems();
    });
};

export default getData;
