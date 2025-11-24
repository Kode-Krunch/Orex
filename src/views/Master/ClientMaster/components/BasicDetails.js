import React from "react";
import { useState, useEffect, useRef } from "react";
import { Switcher, Card, Button, Input, Select, Checkbox, FormItem, FormContainer, } from "components/ui";
import { HiOutlinePencil, } from "react-icons/hi";
import { Toast } from "primereact/toast";
import { apishowplaceTree, } from "services/MasterService";
import { validate, validateFields, showError, removeError, validatePAN, validateAddress, validateInput } from "components/validators";
const BasicDetails = ({ Client, setClient, displayBasicDetails, setdisplayBasicDetails, displayContact, setdisplayContact, countrys, states, citys, CreditRateCodes, }) => {

    const [basicDetailsCompleted, setBasicDetailsCompleted] = useState(false);
    let resSelectedNodeKey = "";
    if (validate(Client.CountryCode)) {
        resSelectedNodeKey = Client.PlaceCode + "-" + Client.StateCode + "-" + Client.CountryCode;
    }
    const [Place, setPlace] = useState([]);
    useEffect(() => {
        (async (values) => {
            const Place = await apishowplaceTree(values);
            const newArray = [];
            Place.data.forEach((country) => {
                country.children.forEach((state) => {
                    state.children.forEach((place) => {
                        newArray.push({
                            CountryCode: country.CountryCode,
                            StateCode: state.StateCode,
                            PlaceCode: place.PlaceCode,
                            PlaceName: place.PlaceName,
                            value: place.PlaceCode,
                            label: place.PlaceName,
                        });
                    });
                });
            });

            setPlace(newArray);
        })();
        if (
            Client.CreditRateCode &&
            Client.ClientName &&
            Client.ClientShortName &&
            Client.MainAddress1 &&
            Client.MainPinCode
        )
            setBasicDetailsCompleted(true);
    }, []);
    const [selectedNodeKey, setSelectedNodeKey] = useState(resSelectedNodeKey);
    const [errorCreditRateCode, seterrorCreditRateCode] = useState(false);
    const [errorClientName, seterrorClientName] = useState(false);
    const [errorClientShortName, seterrorClientShortName] = useState(false);
    const [errorERPCODE, seterrorERPCODE] = useState(false);
    const [errorClientPANNumber, seterrorClientPANNumber] = useState(false);
    const [errorClientTANNumber, seterrorClientTANNumber] = useState(false);
    const [errorBarcCode, seterrorBarcCode] = useState(false);
    const [errorInvalidPANNumber, seterrorInvalidPANNumber] = useState(false);
    useEffect(() => {
        let res = selectedNodeKey.split("-");
        setClient({
            ...Client,
            CountryCode: res[2],
            StateCode: res[1],
            PlaceCode: res[0],
        });
    }, [selectedNodeKey]);

    useEffect(() => {
        let res = validate(selectedNodeKey)
            ? selectedNodeKey.split("-")
            : [0, 0, 0];
        setCountryCode(res[2]);
        setStateCode(res[1]);
        setPlaceCode(res[0]);
    }, [selectedNodeKey]);
    const [CountryCode, setCountryCode] = useState(Client.CountryCode);
    const [StateCode, setStateCode] = useState(Client.StateCode);
    const [PlaceCode, setPlaceCode] = useState(Client.PlaceCode);
    let res = {};
    res.MainAddress1 = true;
    const [errors, setErrors] = useState(res);
    const [touched, setTouched] = useState({});
    const handleValidation = (event) => {
        const address = event.target.value;
        const validationResult = validateAddress(address, 99);
        setClient({ ...Client, MainAddress1: event.target.value });
        const errorsUpdate = { ...errors };
        errorsUpdate.MainAddress1 = !validationResult.isValid
            ? validationResult.errorMessage
            : false;
        setErrors(errorsUpdate);
        const touchedUpdate = { ...touched };
        touchedUpdate.MainAddress1 = true;
        setTouched(touchedUpdate);
    };
    const handleValidationRemarks = (event) => {
        const Remarks = event.target.value;
        const validationResult = validateAddress(Remarks, 250);
        console.log(validationResult);
        setClient({ ...Client, Remarks: Remarks });
        const errorsUpdate = { ...errors };
        errorsUpdate.Remarks = !validationResult.isValid
            ? validationResult.errorMessage
            : false;
        setErrors(errorsUpdate);
        const touchedUpdate = { ...touched };
        touchedUpdate.Remarks = true;
        setTouched(touchedUpdate);
    };

    const handleValidationOtherDetails = (event) => {
        const OtherDetails = event.target.value;
        const validationResult = validateAddress(OtherDetails, 250);
        setClient({ ...Client, OtherDetails: OtherDetails });
        const errorsUpdate = { ...errors };
        errorsUpdate.OtherDetails = !validationResult.isValid
            ? validationResult.errorMessage
            : false;
        setErrors(errorsUpdate);
        const touchedUpdate = { ...touched };
        touchedUpdate.OtherDetails = true;
        setTouched(touchedUpdate);
    };

    const showHeaderExtraContent2 = () => {
        try {
            if (
                Client.ClientName &&
                Client.ClientShortName &&
                Client.ERPCODE &&
                Client.CreditRateCode &&
                Client.MainAddress1 &&
                Client.CountryCode &&
                Client.StateCode &&
                Client.PlaceCode &&
                Client.MainPinCode &&
                basicDetailsCompleted &&
                !displayContact
            ) {
                return true;
            } else return false;
        } catch (error) {
            console.error(error);
        }
    };

    const [errorMainPinCode, seterrorMainPinCode] = useState("");


    // CONTACT
    const [Mobile, setMobile] = useState(Client.Mobile);
    const [Phone, setPhone] = useState(Client.Phone);
    const [Fax, setFax] = useState(Client.Fax);
    const [ContactPerson, setContactPerson] = useState(Client.ContactPerson);
    const [Email, setEmail] = useState(Client.Email);
    const [errorMobile, seterrorMobile] = useState("");
    const [errorPhone, seterrorPhone] = useState("");
    const [errorFax, seterrorFax] = useState("");
    const [errorContactPerson, seterrorContactPerson] = useState("");
    const [errorEmail, seterrorEmail] = useState("");
    const headerExtraContent = (
        <Button
            className="text-emerald-500 text-xl"
            shape="circle"
            variant="plain"
            onClick={() => {
                setdisplayBasicDetails(true);
            }}
            icon={<HiOutlinePencil />}
        />
    );
    const toast = useRef(null);
    const cardFooter = (
        <div className="flex justify-end">
            <Button
                size="sm"
                onClick={() => {
                    const invalidFields = validateFields(Client);
                    if (invalidFields) {
                        const fieldNames = invalidFields.join(", ");
                        toast.current.show({
                            severity: "error",
                            summary: "Error",
                            detail: `The following fields are compulsory and missing: ${fieldNames}`,
                        });
                    } else {
                        setBasicDetailsCompleted(true);
                        setdisplayBasicDetails(false);
                        setdisplayContact(true);
                    }
                }}
            >
                Continue
            </Button>
        </div>
    );
    const headerExtraContent2 = (
        <Button
            className="text-emerald-500 text-xl"
            shape="circle"
            variant="plain"
            onClick={() => {
                setdisplayContact(true);
            }}
            icon={<HiOutlinePencil />}
        />
    );
    const fields2 = [Mobile, Phone, Fax, ContactPerson, Email];
    const cardFooter2 = (
        <div className="flex justify-end">
            <Button
                size="sm"
                onClick={() => {
                    if (!validateFields(fields2)) {
                        toast.current.show({
                            severity: "error",
                            summary: "Error",
                            detail: "all fields are compulsory",
                        });
                    } else {
                        setdisplayContact(false);
                    }
                }}
            >
                Continue
            </Button>
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <div className="grid grid-flow-row auto-rows-max gap-4">
                <Card
                    header={
                        displayBasicDetails ? (
                            "Basic Details"
                        ) : (
                            <div>
                                <h5>Basic Details</h5>
                                <p>{Client.ClientName}</p>
                                <p>{citys[PlaceCode]}</p>
                            </div>
                        )
                    }
                    bodyClass={displayBasicDetails ? "d-block" : "d-none"}
                    footer={displayBasicDetails ? cardFooter : null}
                    headerExtra={displayBasicDetails ? null : headerExtraContent}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="col-span-1">
                            <Card>
                                <FormContainer>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div className="col-span-2 ">
                                            <FormItem
                                                label="Client Name"
                                                invalid={errorClientName}
                                                errorMessage={"ClientName Required"}
                                                asterisk
                                            >
                                                <Input
                                                    id="ClientName"
                                                    value={Client.ClientName}
                                                    maxLength="100"
                                                    onChange={(e) => {

                                                        setClient((oldState) => {
                                                            const newState = { ...oldState }
                                                            if (validateInput(e.target.value, "ClientName")) {
                                                                return newState;
                                                            }
                                                            newState.ClientName = e.target.value;
                                                            return newState;
                                                        }
                                                        );
                                                        if (!validate(e.target.value)) {
                                                            seterrorClientName(true);
                                                            showError("ClientName");
                                                        } else {
                                                            seterrorClientName(false);
                                                            removeError("ClientName");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder=""
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="col-span-1 ">
                                            <FormItem
                                                label="Short Name"
                                                invalid={errorClientShortName}
                                                errorMessage={"ClientShortName Required"}
                                                asterisk
                                            >
                                                <Input
                                                    id="ClientShortName"
                                                    value={Client.ClientShortName}
                                                    maxLength="5"
                                                    onChange={(e) => {
                                                        // setClientShortName(e.target.value)
                                                        setClient({
                                                            ...Client,
                                                            ClientShortName: e.target.value,
                                                        });
                                                        if (!validate(e.target.value)) {
                                                            seterrorClientShortName(true);
                                                            showError("ClientShortName");
                                                        } else {
                                                            seterrorClientShortName(false);
                                                            removeError("ClientShortName");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder=""
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="col-span-1 ">
                                            <FormItem
                                                label="ERPCODE"
                                                invalid={errorERPCODE}
                                                asterisk
                                                errorMessage={"ERPCODE Required"}
                                            >
                                                <Input
                                                    id="ERPCODE"
                                                    value={Client.ERPCODE}
                                                    maxLength="10"
                                                    onChange={(e) => {
                                                        setClient({ ...Client, ERPCODE: e.target.value });
                                                        if (!validate(e.target.value)) {
                                                            seterrorERPCODE(true);
                                                            showError("ERPCODE");
                                                        } else {
                                                            seterrorERPCODE(false);
                                                            removeError("ERPCODE");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder=""
                                                />
                                            </FormItem>
                                        </div>
                                        {/* </FormContainer> */}
                                        <div className="col-span-1 ">
                                            <FormItem
                                                label="PAN Number"
                                                invalid={errorClientPANNumber || errorInvalidPANNumber}
                                                errorMessage={
                                                    errorInvalidPANNumber ? "Invalid PANNumber" : ""
                                                }
                                            // asterisk
                                            >
                                                <Input
                                                    id="ClientPANNumber"
                                                    value={Client.ClientPANNumber}
                                                    onChange={(e) => {
                                                        setClient({
                                                            ...Client,
                                                            ClientPANNumber: e.target.value,
                                                        });
                                                        if (!validate(e.target.value)) {
                                                            seterrorClientPANNumber(true);
                                                            showError("ClientPANNumber");
                                                        } else {
                                                            seterrorClientPANNumber(false);
                                                            removeError("ClientPANNumber");
                                                        }

                                                        if (!validatePAN(e.target.value)) {
                                                            seterrorInvalidPANNumber(true);
                                                            showError("ClientPANNumber");
                                                        } else {
                                                            seterrorInvalidPANNumber(false);
                                                            removeError("ClientPANNumber");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder=""
                                                />
                                            </FormItem>
                                        </div>
                                        {/* </FormContainer> */}
                                        <div className="col-span-1 ">
                                            {/* <FormContainer> */}
                                            <FormItem
                                                label="TAN Number"
                                                invalid={errorClientTANNumber}
                                                errorMessage={"ClientTANNumber Required"}
                                            >
                                                <Input
                                                    id="ClientTANNumber"
                                                    value={Client.ClientTANNumber}
                                                    maxLength="10"
                                                    onChange={(e) => {
                                                        setClient({
                                                            ...Client,
                                                            ClientTANNumber: e.target.value,
                                                        });
                                                        if (!validate(e.target.value)) {
                                                            seterrorClientTANNumber(true);
                                                            showError("ClientTANNumber");
                                                        } else {
                                                            seterrorClientTANNumber(false);
                                                            removeError("ClientTANNumber");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder=""
                                                />
                                            </FormItem>
                                        </div>
                                        {/* </FormContainer> */}
                                        <div className="col-span-1 ">
                                            {/* <FormContainer> */}
                                            <FormItem
                                                label="BARC CODE"
                                                invalid={errorBarcCode}
                                                errorMessage={"BarcCode Required"}
                                            >
                                                <Input
                                                    id="BarcCode"
                                                    value={Client.BarcCode}
                                                    maxLength="10"
                                                    onChange={(e) => {
                                                        setClient({ ...Client, BarcCode: e.target.value });
                                                        // setBarcCode(e.target.value)
                                                        if (!validate(e.target.value)) {
                                                            seterrorBarcCode(true);
                                                            showError("BarcCode");
                                                        } else {
                                                            seterrorBarcCode(false);
                                                            removeError("BarcCode");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder=""
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="col-span-1 ">
                                            <FormItem
                                                label="Credit Rate Code" //{CreditRateCode}
                                                invalid={errorCreditRateCode}
                                                errorMessage={"CreditRateCode Required"}
                                                asterisk
                                            >
                                                <Select
                                                    defaultValue={CreditRateCodes.filter(
                                                        (row) => row.value == Client.CreditRateCode
                                                    )}
                                                    placeholder="Select"
                                                    onChange={(e) => {
                                                        setClient({ ...Client, CreditRateCode: e.value });
                                                    }}
                                                    options={CreditRateCodes}
                                                ></Select>
                                            </FormItem>
                                        </div>
                                    </div>
                                </FormContainer>
                            </Card>
                        </div>
                        <div className="col-span-1 ">
                            <Card>
                                <FormContainer>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div className="col-span-2">
                                            <FormItem
                                                label="Address Line 1"
                                                asterisk
                                                invalid={errors.MainAddress1 && touched.MainAddress1}
                                                errorMessage={
                                                    errors.MainAddress1 ? errors.MainAddress1 : null
                                                }
                                            >
                                                <Input
                                                    textArea
                                                    id="MainAddress1"
                                                    size="sm"
                                                    placeholder="Address Line 1"
                                                    value={Client.MainAddress1}
                                                    maxLength="100"
                                                    onChange={handleValidation}
                                                />
                                            </FormItem>
                                            {/* </FormContainer>    */}
                                        </div>
                                        <div className="col-span-1">
                                            <div className="card flex justify-content-center">
                                                <FormContainer className="w-full">
                                                    <FormItem label="City" asterisk>
                                                        <Select
                                                            name="PlaceCode"
                                                            options={Place}
                                                            value={Place.filter(
                                                                (option) =>
                                                                    option.value == selectedNodeKey.split("-")[0]
                                                            )}
                                                            onChange={(option) => {
                                                                setSelectedNodeKey(
                                                                    option?.value +
                                                                    "-" +
                                                                    option?.StateCode +
                                                                    "-" +
                                                                    option?.CountryCode
                                                                );
                                                            }}
                                                        />
                                                    </FormItem>
                                                </FormContainer>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <FormItem
                                                label="PINCODE"
                                                invalid={errorMainPinCode}
                                                errorMessage={"Valid PinCode Required"}
                                                asterisk
                                            >
                                                <Input
                                                    type="text"
                                                    size="sm"
                                                    placeholder=""
                                                    value={Client.MainPinCode}
                                                    id="MainPinCode"
                                                    onChange={(e) => {
                                                        setClient({
                                                            ...Client,
                                                            MainPinCode: e.target.value,
                                                        });
                                                        // setMainPinCode(e.target.value)
                                                        if (!validate(e.target.value)) {
                                                            seterrorMainPinCode(true);
                                                            showError("PINCODE");
                                                        } else {
                                                            seterrorMainPinCode(false);
                                                            removeError("PINCODE");
                                                        }
                                                    }}
                                                />
                                            </FormItem>
                                        </div>
                                    </div>
                                </FormContainer>
                            </Card>
                        </div>
                    </div>
                </Card>
                <Card
                    header={
                        displayContact ? (
                            "Contact"
                        ) : (
                            <div>
                                <h5>Contact</h5>
                                <p>{Client.Mobile}</p>
                                <p>{Client.ContactPerson}</p>
                            </div>
                        )
                    }
                    bodyClass={displayContact ? "d-block" : "d-none"}
                    footer={displayContact ? cardFooter2 : null}
                    headerExtra={showHeaderExtraContent2() ? headerExtraContent2 : null}
                >
                    <div className="grid grid-cols-10 gap-10">
                        <div className="col-span-7">
                            <Card>
                                <FormContainer>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="col-span-1">
                                            <FormItem
                                                label="Mobile"
                                                invalid={errorMobile}
                                                errorMessage={"Valid Mobile No. Required"}
                                                asterisk
                                            >
                                                <Input
                                                    id="Mobile"
                                                    value={Client.Mobile}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // setMobile(inputValue);
                                                        setClient({ ...Client, Mobile: inputValue });
                                                        // Regular expression to match exactly 10 numeric characters
                                                        const tenDigitNumericRegex = /^\d{10}$/;

                                                        if (!tenDigitNumericRegex.test(inputValue)) {
                                                            seterrorMobile(true);
                                                            showError("Mobile");
                                                        } else {
                                                            seterrorMobile(false);
                                                            removeError("Mobile");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder="Mobile"
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="col-span-1">
                                            <FormItem
                                                label="Phone"
                                                invalid={errorPhone}
                                                errorMessage={"Valid Phone No. Required"}
                                            >
                                                <Input
                                                    id="Phone"
                                                    value={Client.Phone}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        setClient({ ...Client, Phone: inputValue });
                                                        setPhone(inputValue);

                                                        // Regular expression to match exactly 10 numeric characters
                                                        const tenDigitNumericRegex = /^\d{10}$/;

                                                        if (!tenDigitNumericRegex.test(inputValue)) {
                                                            seterrorPhone(true);
                                                            showError("Phone");
                                                        } else {
                                                            seterrorPhone(false);
                                                            showError("Phone");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder="Phone"
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="col-span-1">
                                            <FormItem
                                                label="Fax"
                                                invalid={errorFax}
                                                errorMessage={"Valid Fax No.Required"}
                                            >
                                                <Input
                                                    id="Fax"
                                                    value={Client.Fax}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // setFax(inputValue);
                                                        setClient({ ...Client, Fax: inputValue });
                                                        // Regular expression to match numeric characters
                                                        const numericRegex = /^[0-9]+$/;

                                                        // Additional criteria for fax number length, adjust as needed
                                                        const isValidFax =
                                                            numericRegex.test(inputValue) &&
                                                            inputValue.length >= 7 &&
                                                            inputValue.length <= 15;

                                                        if (!isValidFax) {
                                                            seterrorFax(true);
                                                            showError("Fax");
                                                        } else {
                                                            seterrorFax(false);
                                                            removeError("Fax");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder="Fax"
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="col-span-1">
                                            <FormItem
                                                label="ContactPerson"
                                                invalid={errorContactPerson}
                                                errorMessage={"ContactPerson Required"}
                                                asterisk
                                            >
                                                <Input
                                                    value={Client.ContactPerson}
                                                    id="ContactPerson"
                                                    maxLength="20"
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // setContactPerson(inputValue);
                                                        setClient({ ...Client, ContactPerson: inputValue });
                                                        // Regular expression to match only alphabetic characters
                                                        const alphabeticOnlyRegex = /^[a-zA-Z]+$/;

                                                        if (!alphabeticOnlyRegex.test(inputValue)) {
                                                            seterrorContactPerson(true);
                                                            showError("ContactPerson");
                                                        } else {
                                                            seterrorContactPerson(false);
                                                            removeError("ContactPerson");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder="ContactPerson"
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="col-span-1">
                                            <FormItem
                                                label="Email"
                                                invalid={errorEmail}
                                                errorMessage={"Email Required"}
                                                asterisk
                                            >
                                                <Input
                                                    id="Email"
                                                    value={Client.Email}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        setClient({ ...Client, Email: inputValue });
                                                        // setEmail(inputValue);

                                                        // Regular expression to match valid email addresses
                                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                                        if (!emailRegex.test(inputValue)) {
                                                            seterrorEmail(true);
                                                            showError("Email");
                                                        } else {
                                                            seterrorEmail(false);
                                                            showError("Email");
                                                        }
                                                    }}
                                                    type="text"
                                                    size="sm"
                                                    placeholder="Email"
                                                />
                                            </FormItem>
                                        </div>
                                    </div>
                                </FormContainer>
                            </Card>
                        </div>
                        <div className="col-span-3">
                            <Card>
                                <FormContainer>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="col-span-1">
                                            <Checkbox
                                                onChange={(e) => {
                                                    // console.log(e);
                                                    setClient({ ...Client, IBF: e ? "1" : "0" });
                                                }}
                                                checked={Client.IBF === "1" ? true : false}
                                            >
                                                IBF
                                            </Checkbox>
                                        </div>
                                        <div className="col-span-1">
                                            <Checkbox
                                                onChange={(e) => {
                                                    setClient({ ...Client, IsAAAI: e ? "1" : "0" });
                                                }}
                                                checked={Client.IsAAAI === "1" ? true : false}
                                            >
                                                IsAAAI
                                            </Checkbox>
                                        </div>
                                        <div className="col-span-1">
                                            <Checkbox
                                                onChange={(e) => {
                                                    setClient({ ...Client, OnHold: e ? "1" : "0" });
                                                }}
                                                checked={Client.OnHold === "1" ? true : false}
                                            >
                                                OnHold
                                            </Checkbox>
                                        </div>

                                        <div className="col-span-1">
                                            <Checkbox
                                                onChange={(e) => {
                                                    setClient({ ...Client, IsGovernment: e ? "1" : "0" });
                                                }}
                                                checked={Client.IsGovernment === "1" ? true : false}
                                            >
                                                RCM
                                            </Checkbox>
                                        </div>

                                        <div className="col-span-1">
                                            <Switcher
                                                checked={Client.IsActive || Client.IsActive == "1" ? true : false}
                                                onChange={(val, e) => {
                                                    setClient({ ...Client, IsActive: val });
                                                }}
                                            />
                                            <label htmlFor="" className="ml-2">
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </FormContainer>
                            </Card>
                        </div>

                        <div className="col-span-10">
                            <Card>
                                <FormContainer>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="col-span-1">
                                            <FormItem
                                                invalid={errors.Remarks && touched.Remarks}
                                                errorMessage={errors.Remarks ? errors.Remarks : null}
                                            >
                                                <Input
                                                    textArea
                                                    id="Remarks"
                                                    size="sm"
                                                    placeholder="Remarks"
                                                    value={Client.Remarks}
                                                    maxLength="50"
                                                    onChange={handleValidationRemarks}
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="col-span-1">
                                            <FormItem
                                                invalid={errors.OtherDetails && touched.OtherDetails}
                                                errorMessage={
                                                    errors.OtherDetails ? errors.OtherDetails : null
                                                }
                                            >
                                                <Input
                                                    textArea
                                                    id="OtherDetails"
                                                    size="sm"
                                                    placeholder="OtherDetails"
                                                    value={Client.OtherDetails}
                                                    maxLength="50"
                                                    onChange={handleValidationOtherDetails}
                                                />
                                            </FormItem>
                                        </div>
                                    </div>
                                </FormContainer>
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default BasicDetails;
