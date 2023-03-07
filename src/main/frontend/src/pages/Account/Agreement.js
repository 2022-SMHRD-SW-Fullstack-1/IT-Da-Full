import React from 'react';
import { useState, useEffect } from 'react';

import '../../css/Register.css'

const Agreement = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };
  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };
  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };
  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };
  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);
  return (
    <div className='agreementContainer'>
      <label>약관동의</label>
      <div>
        <div>
          <input
            type="checkbox"
            id="all-check"
            checked={allCheck}
            onChange={allBtnEvent}
          />
          <label htmlFor="all-check">전체동의</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="check1"
            checked={ageCheck}
            onChange={ageBtnEvent}
          />
          <label htmlFor="check1">
            만 14세 이상입니다 <span>(필수)</span>
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="check2"
            checked={useCheck}
            onChange={useBtnEvent}
          />
          <label htmlFor="check2">
            이용약관 <span>(필수)</span>
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="check3"
            checked={marketingCheck}
            onChange={marketingBtnEvent}
          />
          <label htmlFor="check3">
            마케팅 동의 <span>(선택)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default Agreement;