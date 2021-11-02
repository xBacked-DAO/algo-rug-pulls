import React, { useState } from 'react';
import emoji from 'react-easy-emoji';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid';
import { AsyncSelectValue } from './ui/Select';
import { searchAsset  } from './utils/api';

const App = () => {
  const [asset, setAsset] = useState();
  const [search, setSearch] = useState();
  const [assetNotFound, setAssetNotFound] = useState(false);

  const searchForAsset = async (name) => {
    setSearch(name);
    try {
      const res = await searchAsset(name);
      const formatForSelect = res.data.assets.map(asset => ({
          label: `${asset.params.name} (${asset.index})`,
          value: asset.index,
          name: asset.params.name,
          id: asset.index,
          deleted: asset.deleted,
          hasFreeze: asset.params.freeze !== "",
          freezeAddr: asset.params.freeze,
          hasClawback: asset.params.clawback !== "",
          clawbackAddr: asset.params.clawback,
          hasManager: asset.params.manager !== "",
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

  return (
    <div className="flex">
      <div className="m-auto w-3/4">
        <h1 className="text-2xl text-center">Algo Rug Pulls</h1>
        <p className="subtitle text-center pt-5">Helping users of the Algorand Ecosystem detect potential rugs</p>
        
        <div className="p-5">
          <h2 className="text-xl pb-3">Check an Algorand Standard Asset (ASA)</h2>
          
          <AsyncSelectValue
            loadOptions={searchForAsset}
            onChange={option => setAsset(option)}
          />
          
          {assetNotFound && <p>Could not find any assets with term: {search}</p>}
          {asset && (
            <div className="pt-5">
              <p className="result">No clawback? {asset.hasClawback ? emoji('❌') : emoji('✅')} </p>
              <p className="result">No freeze? {asset.hasFreeze ? emoji('❌') : emoji('✅')} </p>
              <p className="result">Could it Rug? {
                asset.hasClawback ||
                asset.hasFreeze ||
                asset.hasManager ? emoji('✅') : emoji('❌')
              }
              </p>
              <div className="border-2 my-5 border-gray-600" />
              <h3 className="text-lg pt-5">How can I be rugged?</h3>
              <p className="pt-3">"Rugging" in crypto refers to bad actors creating scam projects, and then "pulling the rug" out form under users</p>
              <p className="pt-3">On Algorand specifically, clawback and freeze functions are a native feature for ASAs</p>
              
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
                        <p>"The clawback address represents an account that is allowed to transfer assets from and to any asset holder"</p>
                        <a className="text-sm hover:underline text-gray-600" href="https://developer.algorand.org/docs/get-details/asa/">Source</a>
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
                        <p>"Freezing an asset means that the asset can no longer be sent to or from that account... A frozen account can always close out to the asset creator."</p>
                        <a className="text-sm hover:underline text-gray-600" href="https://developer.algorand.org/tutorials/asa-javascript">Source</a>
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
                        <p>"The manager account is the only account that can authorize transactions to re-configure or destroy an asset."</p>
                        <a className="text-sm hover:underline text-gray-600" href="https://developer.algorand.org/docs/get-details/asa/#mutable-asset-parameters">Source</a>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
  }

export default App;
