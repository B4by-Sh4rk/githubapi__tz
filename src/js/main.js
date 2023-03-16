const form = document.querySelector('#form');
const unsearcherH1 = document.querySelector('#unsearched');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = document.querySelector('#search__input').value;
    if(inputValue != ''){
        const queryString = 'q=' + encodeURIComponent(`${inputValue} in:name`);
    const response = await fetch(`https://api.github.com/search/repositories?${queryString}/per_page=10`);
    console.log(response);
    console.log(inputValue);

    if(response.ok){
        const data = await response.json();
        const section = document.querySelector('#section');
        section.innerHTML = '<h1 id="unsearched" class="disp-none">По данному запросу ничего не найдено</h1>';
        for (let i = 0; i < 10; i++) {
            section.appendChild(createResultCard(data, i));
        }
        const inputText = document.querySelector('#search__input');
        inputText.value = '';
        if(unsearcherH1.classList == 'disp-none'){
            console.log('ok');
        }else{
            unsearcherH1.classList.add('disp-none');
            inputText.value = '';
        }
    }else{//если не найдено
        const unsearcherH1 = document.querySelector('#unsearched');
        unsearcherH1.classList.remove('disp-none');
    }
    }else alert('заполните поле!');
})


function createResultCard(repoResp, i){
    console.log(repoResp.total_count);
    if(repoResp.total_count == 0){
        const unsearcherH1 = document.querySelector('#unsearched');
        unsearcherH1.classList.remove('disp-none');
        return;
    }else{
        console.log(repoResp.items[i]);
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');
        const titileUrl = document.createElement('a');
        const titleName = document.createElement('h1');
        titleName.appendChild(titileUrl);
        const disc = document.createElement('p');
        const author = document.createElement('a');
        author.classList.add('author');
        titileUrl.href = `${repoResp.items[i].html_url}`;
        titileUrl.target = '_blank';
        titileUrl.innerHTML = `Название: ${repoResp.items[i].name}`;
        disc.innerHTML = `Описание: ${repoResp.items[i].description}`;
        author.innerHTML = `Автор: ${repoResp.items[i].owner.login}`;
        resultCard.appendChild(titleName);
        resultCard.appendChild(disc);
        resultCard.appendChild(author);
        return resultCard;
    }
}