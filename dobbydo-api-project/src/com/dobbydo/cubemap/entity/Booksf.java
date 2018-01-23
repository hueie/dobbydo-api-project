package com.dobbydo.cubemap.entity;

import java.io.Serializable;

public class Booksf implements Serializable {
	private static final long serialVersionUID = 1L;

    private int booksf_id;  
	
    private int stack_id;  
    private String booksf_nm;
	private String booksf_remk;

	private int booksf_y;
	private int booksf_x;
	private int booksf_z;
	private int booksf_flw;
	private int booksf_row_cnt;
	
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public int getStack_id() {
		return stack_id;
	}


	public void setStack_id(int stack_id) {
		this.stack_id = stack_id;
	}


	public int getBooksf_id() {
		return booksf_id;
	}


	public void setBooksf_id(int booksf_id) {
		this.booksf_id = booksf_id;
	}


	public String getBooksf_nm() {
		return booksf_nm;
	}


	public void setBooksf_nm(String booksf_nm) {
		this.booksf_nm = booksf_nm;
	}


	public String getBooksf_remk() {
		return booksf_remk;
	}


	public void setBooksf_remk(String booksf_remk) {
		this.booksf_remk = booksf_remk;
	}


	public int getBooksf_y() {
		return booksf_y;
	}


	public void setBooksf_y(int booksf_y) {
		this.booksf_y = booksf_y;
	}


	public int getBooksf_row_cnt() {
		return booksf_row_cnt;
	}


	public void setBooksf_row_cnt(int booksf_row_cnt) {
		this.booksf_row_cnt = booksf_row_cnt;
	}


	public int getBooksf_x() {
		return booksf_x;
	}


	public void setBooksf_x(int booksf_x) {
		this.booksf_x = booksf_x;
	}


	public int getBooksf_z() {
		return booksf_z;
	}


	public void setBooksf_z(int booksf_z) {
		this.booksf_z = booksf_z;
	}


	public int getBooksf_flw() {
		return booksf_flw;
	}


	public void setBooksf_flw(int booksf_flw) {
		this.booksf_flw = booksf_flw;
	}


	
}
