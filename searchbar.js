let input = document.querySelector('input');
let results = 0;
input.addEventListener('keyup', function() {
    let html = '';
    if (input.value) {
        for (word of PAGES) {
            if ((word.toLowerCase()).includes(input.value.toLowerCase())) {
                let type = PRODUCT_TYPES[PAGES.indexOf(word)];
                if (results <= 10) {
                    if (PAGES.indexOf(word) == PAGES.length - 1) {
                        html += `<a style = "border: 5px solid #7a2e1a; margin-bottom: -5px;" href = "background-processes.html">${word}</a>`;
                    }
                    else {
                        html += `<a style = "border: 5px solid #7a2e1a; margin-bottom: -5px;" href = "products.html#${type}">${word}</a>`;
                    }
                    results ++;
                }
            }
        }
    }
    results = 0;
    document.querySelector('#list').innerHTML = html;
});