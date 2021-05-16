import React from "react";
import PropTypes from "prop-types";
import { FormControl, Select, InputLabel } from "@material-ui/core";
import { secondary } from "./../../styledComponent/Variables";
import { Text } from "./../../styledComponent/Text";
import styled from "styled-components";

const StyledSelect = styled(FormControl)`
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: unset;

    @media only screen and (max-width: 830px) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.8);
    }
  }
  .MuiInput-underline:before {
    border-bottom: unset;
    @media only screen and (max-width: 830px) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    }
  }

  label {
    font-size: 1.4rem !important;
  }

  .MuiInputBase-input {
    font-size: 1.5rem;
  }
  .MuiInput-underline:after {
    border-bottom: unset;
    @media only screen and (max-width: 830px) {
      border-bottom-color: #53585a;
    }
  }
`;

const Nationality = ({ onChangeNationality, field, msg, lang }) => {
  return (
    <React.Fragment>
      <StyledSelect color="secondary" style={{ width: "100%" }}>
        <InputLabel htmlFor="addressCountry">{lang.country}</InputLabel>
        <Select
          native
          color="secondary"
          defaultValue=""
          style={{ width: "100%" }}
          name="addressCountry"
          onChange={onChangeNationality}
          error={field === "nationality"}
          id="addressCountry"
        >
          <option></option>
          <optgroup label="North America">
            <option value="United States">United States</option>
            <option value="United States Minor Outlying Islands">
              United States Minor Outlying Islands
            </option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Aruba">Aruba</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Barbados">Barbados</option>
            <option value="Belize">Belize</option>
            <option value="Bermuda">Bermuda</option>
            <option value="British Virgin Islands">
              British Virgin Islands
            </option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cuba">Cuba</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Martinique">Martinique</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Netherlands Antilles">Netherlands Antilles</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Panama">Panama</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Vincent and the Grenadines">
              Saint Vincent and the Grenadines
            </option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Turks and Caicos Islands">
              Turks and Caicos Islands
            </option>
            <option value="US Virgin Islands">US Virgin Islands</option>
          </optgroup>
          <optgroup label="South America">
            <option value="Argentina">Argentina</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Brazil">Brazil</option>
            <option value="Chile">Chile</option>
            <option value="Colombia">Colombia</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Falkland Islands (Malvinas)">
              Falkland Islands (Malvinas)
            </option>
            <option value="French Guiana">French Guiana</option>
            <option value="Guyana">Guyana</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Suriname">Suriname</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Venezuela">Venezuela</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="United Kingdom">United Kingdom</option>
            <option value="Albania">Albania</option>
            <option value="Andorra">Andorra</option>
            <option value="Austria">Austria</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Bosnia and Herzegovina">
              Bosnia and Herzegovina
            </option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Croatia (Hrvatska)">Croatia (Hrvatska)</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="France">France</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Germany">Germany</option>
            <option value="Greece">Greece</option>
            <option value="Holy See (Vatican City State)">
              Holy See (Vatican City State)
            </option>
            <option value="Hungary">Hungary</option>
            <option value="Italy">Italy</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Malta">Malta</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Romania">Romania</option>
            <option value="San Marino">San Marino</option>
            <option value="Serbia">Serbia</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Spain">Spain</option>
            <option value="Ukraine">Ukraine</option>
            <option value="Denmark">Denmark</option>
            <option value="Estonia">Estonia</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Finland">Finland</option>
            <option value="Greenland">Greenland</option>
            <option value="Iceland">Iceland</option>
            <option value="Ireland">Ireland</option>
            <option value="Latvia">Latvia</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Norway">Norway</option>
            <option value="Svalbard and Jan Mayen Islands">
              Svalbard and Jan Mayen Islands
            </option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Turkey">Turkey</option>
          </optgroup>
          <optgroup label="Asia">
            <option value="Afghanistan">Afghanistan</option>
            <option value="Armenia">Armenia</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Bhutan">Bhutan</option>
            <option value="British Indian Ocean Territory">
              British Indian Ocean Territory
            </option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Cambodia">Cambodia</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos (Keeling) Islands">
              Cocos (Keeling) Islands
            </option>
            <option value="Georgia">Georgia</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Israel">Israel</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Korea, Democratic People's Republic of">
              Korea, Democratic People's Republic of
            </option>
            <option value="Korea, Republic of">Korea, Republic of</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Lao">Lao</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Myanmar (Burma)">Myanmar (Burma)</option>
            <option value="Nepal">Nepal</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Philippines">Philippines</option>
            <option value="Qatar">Qatar</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Singapore">Singapore</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Syria">Syria</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Thailand">Thailand</option>
            <option value="East Timor">East Timor</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Yemen">Yemen</option>
          </optgroup>
          <optgroup label="Australia / Oceania">
            <option valud="American Samoa">American Samoa</option>
            <option valud="Australia">Australia</option>
            <option valud="Cook Islands">Cook Islands</option>
            <option valud="Fiji">Fiji</option>
            <option valud="French Polynesia (Tahiti)">
              French Polynesia (Tahiti)
            </option>
            <option valud="Guam">Guam</option>
            <option valud="Kiribati">Kiribati</option>
            <option valud="Marshall Islands">Marshall Islands</option>
            <option valud="Micronesia, Federated States of">
              Micronesia, Federated States of
            </option>
            <option valud="Nauru">Nauru</option>
            <option valud="New Caledonia">New Caledonia</option>
            <option valud="New Zealand">New Zealand</option>
            <option valud="Niue">Niue</option>
            <option valud="Northern Mariana Islands">
              Northern Mariana Islands
            </option>
            <option valud="Palau">Palau</option>
            <option valud="Papua New Guinea">Papua New Guinea</option>
            <option valud="Pitcairn">Pitcairn</option>
            <option valud="Samoa">Samoa</option>
            <option valud="Solomon Islands">Solomon Islands</option>
            <option valud="Tokelau">Tokelau</option>
            <option valud="Tonga">Tonga</option>
            <option valud="Tuvalu">Tuvalu</option>
            <option valud="Vanuatu">Vanuatu</option>
            <option valud="Wallis and Futuna Islands">
              Wallis and Futuna Islands
            </option>
          </optgroup>
          <optgroup label="Africa">
            <option value="Algeria">Algeria</option>
            <option value="Angola">Angola</option>
            <option value="Benin">Benin</option>
            <option value="Botswana">Botswana</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Central African Republic">
              Central African Republic
            </option>
            <option value="Chad">Chad</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo, the Democratic Republic of the">
              Congo, the Democratic Republic of the
            </option>
            <option value="Dijibouti">Dijibouti</option>
            <option value="Egypt">Egypt</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Ghana">Ghana</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Cote d'Ivoire (Ivory Coast)">
              Cote d"Ivoire (Ivory Coast)
            </option>
            <option value="Kenya">Kenya</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Mali">Mali</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Namibia">Namibia</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Reunion">Reunion</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Sudan">Sudan</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Togo">Togo</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Uganda">Uganda</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </optgroup>
          <option value="AQ">Antarctica</option>
        </Select>
      </StyledSelect>
      {field === "nationality" && <Text cr={secondary}>{msg}</Text>}
    </React.Fragment>
  );
};

Nationality.propTypes = {};

export default Nationality;
