import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_APP_KEY
);

function Hit({ hit }) {
  return (
    <a href="#" className="flex items-center mb-5">
      <img
        src="https://cdn.sanity.io/images/jdiyrv6o/production/b6a697c29f0cc0aaacd9776b20b553baaf24063d-1000x1000.jpg"
        alt=""
        className="rounded-full mr-3"
        width="37.55"
        height="37.55"
      />
      <p className="font-700 mr-auto">
        <Highlight
          attribute="node.product_name"
          hit={hit}
          classNames={{ highlighted: 'bg-#D5EDE4 border-rd-1' }}
        />
      </p>
      <p className="mr-5 text-3">€ {hit.node.price / 100}</p>
      <i
        href="#"
        className="i-material-symbols:keyboard-arrow-right c-dark1 opacity-50 text-3"
      ></i>
    </a>
  );
}

function App() {
  const [showResults, setShowResults] = useState(false);

  return (
    <InstantSearch
      searchClient={searchClient}
      searchOnLoad={false}
      indexName="easycookasia_challenge2"
    >
      <div className="flex flex-col items-center">
        <SearchBox
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          classNames={{
            root: 'mb-4',
            form: ' relative inline-block border-solid border-2 b-transparent hover:b-#D5EDE4 border-rd-3',
            input:
              'w-36rem px-12 py-4 border-1 b-dark1 border-rd-3 bg-transparent font-700',
            submit:
              'absolute left-5 top-50% translate-y--50%  b-transparent b-0 p-0 w-5 h-5 i-material-symbols:search',
            submitIcon: 'opacity-0',
            reset:
              'absolute right-5 top-50% translate-y--50%   b-transparent rounded-full p-0 b-0  w-10px h-10px i-material-symbols:cancel cursor-pointer',
            resetIcon: 'opacity-0',
          }}
        />
        {showResults ? (
          <div className="w-36rem p-4 bg-white border-rd-4">
            <div className="flex justify-between items-center mb-6">
              <p className="dark-1 opacity-50% font-700">Product</p>
              <a href="#" className="c-#FE5B30 font-700 ">
                See all
              </a>
            </div>
            <Hits hitComponent={Hit} className={{ list: 'list-none p-0' }} />
          </div>
        ) : null}
      </div>
    </InstantSearch>
  );
}

export default App;
