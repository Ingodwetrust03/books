'use strict'

const getData = () => {

const blockForRender = document.querySelector('.row')

    fetch('https://test-a02e8-default-rtdb.firebaseio.com/db.json')
        .then(response => response.json())
        .then((json) => {
            let jsonFormat = json
            console.log(jsonFormat)

            jsonFormat.forEach((item) => {
                const actor = {
                    actors: item.actors,
                    citizenship: item.citizenship,
                    birthDay: item.birthDay,
                    deathDay: item.deathDay,
                    gender: item.gender,
                    movies: item.movies,
                    name: item.name,
                    photo: item.photo,
                    species: item.species,
                    status: item.status,
                    realName: item.realName,
                }

                let actorBlock = document.createElement('div')
                actorBlock.classList.add('actor')

                actorBlock.innerHTML = `<div class='actor-photo'><img src='${actor.photo}'></div><div class='actor-name'><p>Актер: ${actor.actors}</p> </div><div class='actor-realname'><p>Настоящее имя: ${actor.realName}</p.> </div><div class='actor-citizenship'><p>Гражданство: ${actor.citizenship}</p> </div><div class='actor-birthday'><p>Год рождения: ${actor.birthDay}</p> </div><div class='actor-deathDay'><p>Год смерти: ${actor.deathDay} </p></div><div class='actor-gender'><p>Пол: ${actor.gender}</p> </div><div class='actor-movies'><p>Фильмография: ${actor.movies}</p></div><div class='actor-name'><p>Герои: ${actor.name}</p></div><div class='actor-species'><p>Тип: ${actor.species}</p> </div><div class='actor-status'><p>Статус: ${actor.status}</p.> </div>`
    
            blockForRender.append(actorBlock)
            console.log(actorBlock)
            
            })
 
      
    })


}

export default getData