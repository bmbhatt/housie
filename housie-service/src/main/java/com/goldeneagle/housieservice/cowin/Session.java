
package com.goldeneagle.housieservice.cowin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "center_id",
    "name",
    "address",
    "state_name",
    "district_name",
    "block_name",
    "pincode",
    "from",
    "to",
    "lat",
    "long",
    "fee_type",
    "session_id",
    "date",
    "available_capacity_dose1",
    "available_capacity_dose2",
    "available_capacity",
    "fee",
    "min_age_limit",
    "vaccine",
    "slots"
})
public class Session {

    @JsonProperty("center_id")
    private Integer centerId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("address")
    private String address;
    @JsonProperty("state_name")
    private String stateName;
    @JsonProperty("district_name")
    private String districtName;
    @JsonProperty("block_name")
    private String blockName;
    @JsonProperty("pincode")
    private Integer pincode;
    @JsonProperty("from")
    private String from;
    @JsonProperty("to")
    private String to;
    @JsonProperty("lat")
    private Integer lat;
    @JsonProperty("long")
    private Integer _long;
    @JsonProperty("fee_type")
    private String feeType;
    @JsonProperty("session_id")
    private String sessionId;
    @JsonProperty("date")
    private String date;
    @JsonProperty("available_capacity_dose1")
    private Integer availableCapacityDose1;
    @JsonProperty("available_capacity_dose2")
    private Integer availableCapacityDose2;
    @JsonProperty("available_capacity")
    private Integer availableCapacity;
    @JsonProperty("fee")
    private String fee;
    @JsonProperty("min_age_limit")
    private Integer minAgeLimit;
    @JsonProperty("vaccine")
    private String vaccine;
    @JsonProperty("slots")
    private List<String> slots = new ArrayList<String>();
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("center_id")
    public Integer getCenterId() {
        return centerId;
    }

    @JsonProperty("center_id")
    public void setCenterId(Integer centerId) {
        this.centerId = centerId;
    }

    public Session withCenterId(Integer centerId) {
        this.centerId = centerId;
        return this;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    public Session withName(String name) {
        this.name = name;
        return this;
    }

    @JsonProperty("address")
    public String getAddress() {
        return address;
    }

    @JsonProperty("address")
    public void setAddress(String address) {
        this.address = address;
    }

    public Session withAddress(String address) {
        this.address = address;
        return this;
    }

    @JsonProperty("state_name")
    public String getStateName() {
        return stateName;
    }

    @JsonProperty("state_name")
    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public Session withStateName(String stateName) {
        this.stateName = stateName;
        return this;
    }

    @JsonProperty("district_name")
    public String getDistrictName() {
        return districtName;
    }

    @JsonProperty("district_name")
    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    public Session withDistrictName(String districtName) {
        this.districtName = districtName;
        return this;
    }

    @JsonProperty("block_name")
    public String getBlockName() {
        return blockName;
    }

    @JsonProperty("block_name")
    public void setBlockName(String blockName) {
        this.blockName = blockName;
    }

    public Session withBlockName(String blockName) {
        this.blockName = blockName;
        return this;
    }

    @JsonProperty("pincode")
    public Integer getPincode() {
        return pincode;
    }

    @JsonProperty("pincode")
    public void setPincode(Integer pincode) {
        this.pincode = pincode;
    }

    public Session withPincode(Integer pincode) {
        this.pincode = pincode;
        return this;
    }

    @JsonProperty("from")
    public String getFrom() {
        return from;
    }

    @JsonProperty("from")
    public void setFrom(String from) {
        this.from = from;
    }

    public Session withFrom(String from) {
        this.from = from;
        return this;
    }

    @JsonProperty("to")
    public String getTo() {
        return to;
    }

    @JsonProperty("to")
    public void setTo(String to) {
        this.to = to;
    }

    public Session withTo(String to) {
        this.to = to;
        return this;
    }

    @JsonProperty("lat")
    public Integer getLat() {
        return lat;
    }

    @JsonProperty("lat")
    public void setLat(Integer lat) {
        this.lat = lat;
    }

    public Session withLat(Integer lat) {
        this.lat = lat;
        return this;
    }

    @JsonProperty("long")
    public Integer getLong() {
        return _long;
    }

    @JsonProperty("long")
    public void setLong(Integer _long) {
        this._long = _long;
    }

    public Session withLong(Integer _long) {
        this._long = _long;
        return this;
    }

    @JsonProperty("fee_type")
    public String getFeeType() {
        return feeType;
    }

    @JsonProperty("fee_type")
    public void setFeeType(String feeType) {
        this.feeType = feeType;
    }

    public Session withFeeType(String feeType) {
        this.feeType = feeType;
        return this;
    }

    @JsonProperty("session_id")
    public String getSessionId() {
        return sessionId;
    }

    @JsonProperty("session_id")
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Session withSessionId(String sessionId) {
        this.sessionId = sessionId;
        return this;
    }

    @JsonProperty("date")
    public String getDate() {
        return date;
    }

    @JsonProperty("date")
    public void setDate(String date) {
        this.date = date;
    }

    public Session withDate(String date) {
        this.date = date;
        return this;
    }

    @JsonProperty("available_capacity_dose1")
    public Integer getAvailableCapacityDose1() {
        return availableCapacityDose1;
    }

    @JsonProperty("available_capacity_dose1")
    public void setAvailableCapacityDose1(Integer availableCapacityDose1) {
        this.availableCapacityDose1 = availableCapacityDose1;
    }

    public Session withAvailableCapacityDose1(Integer availableCapacityDose1) {
        this.availableCapacityDose1 = availableCapacityDose1;
        return this;
    }

    @JsonProperty("available_capacity_dose2")
    public Integer getAvailableCapacityDose2() {
        return availableCapacityDose2;
    }

    @JsonProperty("available_capacity_dose2")
    public void setAvailableCapacityDose2(Integer availableCapacityDose2) {
        this.availableCapacityDose2 = availableCapacityDose2;
    }

    public Session withAvailableCapacityDose2(Integer availableCapacityDose2) {
        this.availableCapacityDose2 = availableCapacityDose2;
        return this;
    }

    @JsonProperty("available_capacity")
    public Integer getAvailableCapacity() {
        return availableCapacity;
    }

    @JsonProperty("available_capacity")
    public void setAvailableCapacity(Integer availableCapacity) {
        this.availableCapacity = availableCapacity;
    }

    public Session withAvailableCapacity(Integer availableCapacity) {
        this.availableCapacity = availableCapacity;
        return this;
    }

    @JsonProperty("fee")
    public String getFee() {
        return fee;
    }

    @JsonProperty("fee")
    public void setFee(String fee) {
        this.fee = fee;
    }

    public Session withFee(String fee) {
        this.fee = fee;
        return this;
    }

    @JsonProperty("min_age_limit")
    public Integer getMinAgeLimit() {
        return minAgeLimit;
    }

    @JsonProperty("min_age_limit")
    public void setMinAgeLimit(Integer minAgeLimit) {
        this.minAgeLimit = minAgeLimit;
    }

    public Session withMinAgeLimit(Integer minAgeLimit) {
        this.minAgeLimit = minAgeLimit;
        return this;
    }

    @JsonProperty("vaccine")
    public String getVaccine() {
        return vaccine;
    }

    @JsonProperty("vaccine")
    public void setVaccine(String vaccine) {
        this.vaccine = vaccine;
    }

    public Session withVaccine(String vaccine) {
        this.vaccine = vaccine;
        return this;
    }

    @JsonProperty("slots")
    public List<String> getSlots() {
        return slots;
    }

    @JsonProperty("slots")
    public void setSlots(List<String> slots) {
        this.slots = slots;
    }

    public Session withSlots(List<String> slots) {
        this.slots = slots;
        return this;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    public Session withAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
        return this;
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(centerId).append(name).append(address).append(stateName).append(districtName).append(blockName).append(pincode).append(from).append(to).append(lat).append(_long).append(feeType).append(sessionId).append(date).append(availableCapacityDose1).append(availableCapacityDose2).append(availableCapacity).append(fee).append(minAgeLimit).append(vaccine).append(slots).append(additionalProperties).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Session) == false) {
            return false;
        }
        Session rhs = ((Session) other);
        return new EqualsBuilder().append(centerId, rhs.centerId).append(name, rhs.name).append(address, rhs.address).append(stateName, rhs.stateName).append(districtName, rhs.districtName).append(blockName, rhs.blockName).append(pincode, rhs.pincode).append(from, rhs.from).append(to, rhs.to).append(lat, rhs.lat).append(_long, rhs._long).append(feeType, rhs.feeType).append(sessionId, rhs.sessionId).append(date, rhs.date).append(availableCapacityDose1, rhs.availableCapacityDose1).append(availableCapacityDose2, rhs.availableCapacityDose2).append(availableCapacity, rhs.availableCapacity).append(fee, rhs.fee).append(minAgeLimit, rhs.minAgeLimit).append(vaccine, rhs.vaccine).append(slots, rhs.slots).append(additionalProperties, rhs.additionalProperties).isEquals();
    }

}
