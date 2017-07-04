import React from 'react';
import { StaticRouter } from 'react-router';
import App from 'shared/App';
import configureStore from 'redux/configureStore';
import { Provider } from 'react-redux';
/* react-router-server 의 renderToString 은 비동기로 작동하며,
   데이터 로딩도 관리해줍니다. */
import { renderToString } from 'react-router-server';

import { Helmet } from 'react-helmet';

const render = async (location) => {
    const store = configureStore();
    const { html } = await renderToString(
        <StaticRouter location={location}>
            <Provider store={store}>
                <App/>
            </Provider>
        </StaticRouter>
    )

    const helmet = Helmet.renderStatic();
    return {
        html,
        state: store.getState(),
        helmet,
    }
}

export default render;