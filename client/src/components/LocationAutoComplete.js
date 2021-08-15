import React, { useState, useEffect } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import useScript from '../utils/useScript';

const LocationAutoComplete = ({ address, onChange }) => {
    const [loaded] = useScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCiKqUNW10547SuGRyX5vEfkb6UgidL6Os&libraries=places');
    const [scriptLoaded, setScriptLoaded] = useState(false)

    useEffect(() => {
        if (loaded) {
            setScriptLoaded(true)
        }
    }, [loaded]);

    const searchOptions = {
        componentRestrictions: { country: "au" }
    }

    const handleChange = address => {
        onChange(address);
        // setAddress(address);
    };

    const handleSelect = async (selected) => {
        onChange(selected);
        // setAddress(selected);
        // geocodeByAddress(selected)
        //     .then(res => getLatLng(res[0]))
        //     .then(({ lat, lng }) => {
        //         this.setState({
        //             latitude: lat,
        //             longitude: lng,
        //             isGeocoding: false,
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({ isGeocoding: false });
        //         console.log('error', error);
        //     });
    };

    if (scriptLoaded) {
        return (
            <div>
                <PlacesAutocomplete
                    onChange={handleChange}
                    value={address}
                    onSelect={handleSelect}
                    searchOptions={searchOptions}
                    shouldFetchSuggestions={address.length > 0}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                        return (
                            <div className="ui searchwrap search">
                                <div className="ui large fluid icon input">
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Search Places...',
                                            className: 'searchlocation prompt',
                                        })}
                                    />
                                    <i className="search icon" />
                                </div>
                                {suggestions.length > 0 && (
                                    <div className="location__dropdown">
                                        {suggestions.map((suggestion, index) => {
                                            return (
                                                <div className="list" key={index} {...getSuggestionItemProps(suggestion)}>
                                                    <strong>
                                                        {suggestion.formattedSuggestion.mainText}
                                                    </strong>{' '}
                                                    <small>
                                                        {suggestion.formattedSuggestion.secondaryText}
                                                    </small>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }}
                </PlacesAutocomplete>
            </div>
        );
    } else {
        return (<></>)
    }
}

export default LocationAutoComplete;