//  const btnGenerator = document.getElementById ('button');

//  btnGenerator.addEventListener('click', () => {
//          fetch ('https://api.adviceslip.com/advice')
//          .then (response => response.json())
//          .then ((data) => {
//              document.querySelector ('.advice-top').innerHTML = `
//                  <div class="advice-id">
//                      <span>Advice ${data.slip.id}</span>
//                  </div>
//                  <div class="advice-text">
//                      ${data.slip.advice}
//                  </div>`
//          })
//          .catch(error => console.error(error));
//      })


let adviceArray = [];

const fetchAdvice = (size = 5) => {
    const fetchPromises = [];
    for (let i = 0; i < size; i++) {
        fetchPromises.push(
            fetch ('https://api.adviceslip.com/advice')
            .then ((response) => response.json())
            .then ((data) => data.slip)
        )
    };

    return Promise.all(fetchPromises)
    .then((adviceList) => {
        adviceArray.push(...adviceList);
    })
    .catch((error) => console.error ('Erro na api', error))
};

const btnGenerator = document.getElementById ('button');

btnGenerator.addEventListener('click', () => {

    if (adviceArray.length > 0) {
        const data = adviceArray.shift();
        document.querySelector ('.advice-top').innerHTML = `
            <div class="advice-id">
                <span>Advice ${data.id}</span>
            </div>
            <div class="advice-text">
                ${data.advice}
            </div>`;
        
        if (adviceArray.length < 3) {
            fetchAdvice();
        };

    };
});

fetchAdvice();