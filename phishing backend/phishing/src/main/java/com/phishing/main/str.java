package com.phishing.main;
import java.util.HashMap;
import java.util.*;
class str{
    public static void main(String[] args) {
        

       
        Scanner inp = new Scanner(System.in);
        int n=inp.nextInt();
        int[] arr=new int[n];
        for(int i=0;i<n;i++){
            String s=inp.next();
            String[] parts = s.split(",");   
            String ss=parts[0]+parts[1];
           Integer a=new Integer(ss);
            arr[i]=a;
           
        }
        System.out.println(Arrays.toString(arr));


    }
}