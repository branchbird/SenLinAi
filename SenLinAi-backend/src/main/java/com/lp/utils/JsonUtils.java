package com.lp.utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

public class JsonUtils {
    public boolean isJson(String jsonStr){
        JsonElement jsonElement = null;
        try {
            jsonElement = JsonParser.parseString(jsonStr);
        } catch (JsonSyntaxException e) {
            System.out.println("JsonSyntaxException:false");
            return false;
        }catch (Exception e) {
            System.out.println("Exception e:false");
            return false;
        }
        if (jsonElement == null) {
            System.out.println("jsonElement == null:false");
            return false;
        }
        if (!jsonElement.isJsonObject()) {
            System.out.println("!jsonElement.isJsonObject():false");
            return false;
        }
        System.out.println(true);
        return true;
    }
}
