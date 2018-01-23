package com.dobbydo.cubemap.entity;

import java.io.Serializable;


public class Box implements Serializable {
	private static final long serialVersionUID = 1L;

    private int box_id;  
	
    private String box_nm;
	private String box_remk;
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getBox_id() {
		return box_id;
	}

	public void setBox_id(int box_id) {
		this.box_id = box_id;
	}

	public String getBox_nm() {
		return box_nm;
	}

	public void setBox_nm(String box_nm) {
		this.box_nm = box_nm;
	}

	public String getBox_remk() {
		return box_remk;
	}

	public void setBox_remk(String box_remk) {
		this.box_remk = box_remk;
	}
	
}
