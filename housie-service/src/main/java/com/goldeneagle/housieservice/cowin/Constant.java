package com.goldeneagle.housieservice.cowin;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Constant {

    public static final String DEFAULT_DISTRICT = "581";

    public static final DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

    public static final String CURRENT_DATE_STR = formatter.format(new Date());

}
