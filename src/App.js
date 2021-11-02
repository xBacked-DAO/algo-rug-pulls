import React, { useState } from 'react';
import emoji from 'react-easy-emoji';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { AsyncSelectValue } from './ui/Select';
import { getAsset, searchAsset } from './utils/api';
import Spinner from './ui/Spinner';

const App = () => {
  const [asset, setAsset] = useState();
  const [assetId, setAssetId] = useState();
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [assetNotFound, setAssetNotFound] = useState(false);

  const searchForAsset = async (name) => {
    setSearch(name);
    try {
      const res = await searchAsset(name);
      const formatForSelect = res.data.assets.map((asset) => ({
        label: `${asset.params.name} (${asset.index})`,
        value: asset.index,
        name: asset.params.name,
        id: asset.index,
        deleted: asset.deleted,
        hasFreeze: asset.params.freeze !== '',
        freezeAddr: asset.params.freeze,
        hasClawback: asset.params.clawback !== '',
        clawbackAddr: asset.params.clawback,
        hasManager: asset.params.manager !== '',
        managerAddr: asset.params.manager,
        url: asset.params.url,
        total: asset.params.total
      }));
      return formatForSelect;
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 404) {
        setAssetNotFound(true);
      }
      return e;
    }
  };

  const searchForAssetId = async () => {
    setLoading(true);
    try {
      const res = await getAsset(assetId);
      const returnedAsset = res.data.asset;
      const formattedAsset = {
        label: `${returnedAsset.params.name} (id: ${returnedAsset.index})`,
        value: returnedAsset.index,
        name: returnedAsset.params.name,
        id: returnedAsset.index,
        deleted: returnedAsset.deleted,
        hasFreeze: returnedAsset.params.freeze !== '',
        freezeAddr: returnedAsset.params.freeze,
        hasClawback: returnedAsset.params.clawback !== '',
        clawbackAddr: returnedAsset.params.clawback,
        hasManager: returnedAsset.params.manager !== '',
        managerAddr: returnedAsset.params.manager,
        url: returnedAsset.params.url,
        total: returnedAsset.params.total
      };
      setAsset(formattedAsset);
      setLoading(false);
      return returnedAsset;
    } catch (e) {
      setLoading(false);
      console.log(e.response.status);
      if (e.response.status === 404) {
        setAssetNotFound(true);
      }
      return e;
    }
  };

  return (
    <div className="flex">
      <div className="m-auto w-3/4">
        <h1 className="text-2xl text-center mt-5">Algo Rug Pulls</h1>
        <p className="subtitle text-center pt-5">
          Helping users of the Algorand Ecosystem detect potential rugs
        </p>

        <div className="p-5">
          <h2 className="text-xl pb-3">
            Check an Algorand Standard Asset (ASA)
          </h2>

          <p className="pt-3 text-sm font-bold">
            Check a specific ASA by Asset ID
          </p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(e) => setAssetId(e.target.value)}
          />
          <button
            className="ml-5 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
            onClick={() => searchForAssetId()}>
            Check specific Asset ID
          </button>

          <p className="pt-3 text-sm font-bold">Search for an ASA by name</p>

          <AsyncSelectValue
            loadOptions={searchForAsset}
            onChange={(option) => setAsset(option)}
          />

          {assetNotFound && (
            <p>Could not find any assets with term: {search}</p>
          )}
          {loading && <Spinner />}
          {asset && !loading && (
            <div className="pt-5">
              <h2 className="text-lg font-bold">Results for {asset.name}</h2>
              <p className="result">
                No clawback? {asset.hasClawback ? emoji('❌') : emoji('✅')}{' '}
              </p>
              <p className="result">
                No freeze? {asset.hasFreeze ? emoji('❌') : emoji('✅')}{' '}
              </p>
              <p className="result">
                Could it Rug?{' '}
                {asset.hasClawback || asset.hasFreeze || asset.hasManager
                  ? emoji('✅')
                  : emoji('❌')}
              </p>
            </div>
          )}
          <div className="border-2 my-5 border-gray-600" />
          <h3 className="text-lg pt-5">How can I be rugged?</h3>
          <p className="pt-3">
            "Rugging" in crypto refers to bad actors creating scam projects, and
            then "pulling the rug" out from under users
          </p>
          <p className="pt-3">
            On Algorand specifically, clawback and freeze functions are a native
            feature for ASAs that make it even easier for bad actors to rug pull
          </p>

          <p className="pt-3">
            It's important to note that some protocols will have legitimate uses
            for these features. Make sure it is clear in their documentation why
            they require this for their asset, and how access to these features is contolled.
          </p>

          <div className="mt-6">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-200 rounded-lg hover:bg-purple-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>What is a Clawback?</span>
                    <ChevronUpIcon
                      className={`${
                        !open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                    <p>
                      "The clawback address represents an account that is
                      allowed to transfer assets from and to any asset holder"
                    </p>
                    <a
                      className="text-sm hover:underline text-gray-600"
                      href="https://developer.algorand.org/docs/get-details/asa/">
                      Source
                    </a>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-200 rounded-lg hover:bg-purple-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>What is a Freeze?</span>
                    <ChevronUpIcon
                      className={`${
                        !open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                    <p>
                      "Freezing an asset means that the asset can no longer be
                      sent to or from that account... A frozen account can
                      always close out to the asset creator."
                    </p>
                    <a
                      className="text-sm hover:underline text-gray-600"
                      href="https://developer.algorand.org/tutorials/asa-javascript">
                      Source
                    </a>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-200 rounded-lg hover:bg-purple-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>What is a manager?</span>
                    <ChevronUpIcon
                      className={`${
                        !open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                    <p>
                      "The manager account is the only account that can
                      authorize transactions to re-configure or destroy an
                      asset."
                    </p>
                    <a
                      className="text-sm hover:underline text-gray-600"
                      href="https://developer.algorand.org/docs/get-details/asa/#mutable-asset-parameters">
                      Source
                    </a>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <p className="text-xs italic mt-10 result">
              {emoji('⚠️')} Disclaimer: we are not claiming any proejcts are a rug.
              We are simply displaying information, and explaining what it means to consumers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
