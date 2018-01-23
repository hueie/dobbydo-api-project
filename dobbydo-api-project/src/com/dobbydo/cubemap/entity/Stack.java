package com.dobbydo.cubemap.entity;

import java.io.Serializable;

public class Stack implements Serializable {
	private static final long serialVersionUID = 1L;
	
    private int stack_id;  
	
    private String stack_nm;
	private int keep_booksf_cnt;
	private String stack_remk;
	
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public int getStack_id() {
		return stack_id;
	}


	public void setStack_id(int stack_id) {
		this.stack_id = stack_id;
	}


	public String getStack_nm() {
		return stack_nm;
	}


	public void setStack_nm(String stack_nm) {
		this.stack_nm = stack_nm;
	}


	public int getKeep_booksf_cnt() {
		return keep_booksf_cnt;
	}


	public void setKeep_booksf_cnt(int keep_booksf_cnt) {
		this.keep_booksf_cnt = keep_booksf_cnt;
	}


	public String getStack_remk() {
		return stack_remk;
	}


	public void setStack_remk(String stack_remk) {
		this.stack_remk = stack_remk;
	}
	
	
}
