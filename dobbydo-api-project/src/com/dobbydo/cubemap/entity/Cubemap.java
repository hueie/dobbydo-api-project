package com.dobbydo.cubemap.entity;

import java.io.Serializable;

public class Cubemap implements Serializable {
	private static final long serialVersionUID = 1L;
	
    private int cube_idx;
    private int stack_id;
    private int pos_x;
    private int pos_y;
    private int pos_z;
    private int object_id;
    private int cube_type;
    private int linked_id;
    private int cube_size;
    private int cube_axis;
	
	public int getCube_idx() {
		return cube_idx;
	}

	public void setCube_idx(int cube_idx) {
		this.cube_idx = cube_idx;
	}

	public int getStack_id() {
		return stack_id;
	}

	public void setStack_id(int stack_id) {
		this.stack_id = stack_id;
	}

	public int getPos_x() {
		return pos_x;
	}

	public void setPos_x(int pos_x) {
		this.pos_x = pos_x;
	}

	public int getPos_y() {
		return pos_y;
	}

	public void setPos_y(int pos_y) {
		this.pos_y = pos_y;
	}

	public int getPos_z() {
		return pos_z;
	}

	public void setPos_z(int pos_z) {
		this.pos_z = pos_z;
	}

	public int getObject_id() {
		return object_id;
	}

	public void setObject_id(int object_id) {
		this.object_id = object_id;
	}

	public int getCube_type() {
		return cube_type;
	}

	public void setCube_type(int cube_type) {
		this.cube_type = cube_type;
	}

	public int getLinked_id() {
		return linked_id;
	}

	public void setLinked_id(int linked_id) {
		this.linked_id = linked_id;
	}

	public int getCube_size() {
		return cube_size;
	}

	public void setCube_size(int cube_size) {
		this.cube_size = cube_size;
	}

	public int getCube_axis() {
		return cube_axis;
	}

	public void setCube_axis(int cube_axis) {
		this.cube_axis = cube_axis;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

}
