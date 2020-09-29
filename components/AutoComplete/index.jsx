import styled from 'styled-components';

export const Input = styled.input`
  line-height: 2.4rem;
  position: relative;
  width: 100%;
  min-height: 3.6rem;
  margin: 0;
  padding: 0.5rem 1.2rem;
  background: white;
  font-size: 1.6rem;
  font-weight: 400;
  border: 0.1rem solid #c4cdd5;
  border-radius: 3px;
  :focus {
    outline: 0.1rem solid #3f4eae;
    border: 0.1rem solid #3f4eae;
  }

  @media screen and (min-width: 40em) {
    font-size: 1.4rem;
  }
`;

export const Dropdown = styled.div`
  background-color: #fff;
  border-radius: 2px;
  border-top: 1px solid #d9d9d9;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  display: ${({ suggestions }) => (suggestions.length ? 'block' : 'none')};
`;

export const PlaceItem = styled.div`
  padding: 0 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 30px;
  text-align: left;
  border-top: 1px solid #e6e6e6;
  font-size: 11px;
  color: #999;
  background-color: ${({ active }) => (active ? '#e8e8e8' : '')};
`;

export const MarkerIcon = styled.span`
  background-position: ${({ active }) => (active ? '-18px -161px' : '-1px -161px')};
  width: 15px;
  height: 20px;
  margin-right: 7px;
  margin-top: 6px;
  display: inline-block;
  vertical-align: top;
  background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons.png);
  background-size: 34px;
`;

export const MainText = styled.span`
  font-size: 13px;
  padding-right: 3px;
  color: #000;
  font-weight: bold;
`;
