function doGet(e) {
    let page = 'index';
    let title = '拡張Qiita';
    const htmlOutput = HtmlService.createTemplateFromFile(page).evaluate();
    htmlOutput.setTitle(title);
    return htmlOutput;
}

function Search(param) {
    try {
        const response = UrlFetchApp.fetch(`https://qiita.com/api/v2/items?page=${param.page}&per_page=10&${createQuery(param)}`);
        const content = response.getContentText();
        return [JSON.parse(content), param.page];
    } catch (e) {
        return e;
    }
}

function createQuery(param) {
    const query = [];
    if (param.title) query.push(`title:${param.title}`);
    if (param.body) query.push(`body:${param.body}`);
    if (param.tag) query.push(`tag:${param.tag}`);
    if (param.stock) query.push(`stocks:>=${param.stock}`);
    if (param.created) query.push(`created:>=${param.created}`);
    return encodeURI(`query=${query.join('+')}`);
}
