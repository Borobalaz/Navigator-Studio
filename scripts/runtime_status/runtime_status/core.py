import sys
import json
import threading
import traceback
from enum import Enum


class ExitCategory(Enum):
	SUCCESS = 0
	WARNING = 1
	ERROR = 2
	VALIDATION_ERROR = 3
	SYSTEM_ERROR = 4


class RuntimeStatus:
	def __init__(self, auto_handle_exceptions=True):
		self._progress = -1
		self._exit_category = None
		self._exit_message = None
		self._lock = threading.Lock()
		self._finished = False
	
		if auto_handle_exceptions:
			sys.excepthook = self._handle_unhandled_exception

		# -------------------------
		# Internal JSON printer
		# -------------------------
	def _emit(self, payload: dict):
		print(json.dumps(payload, ensure_ascii=False), flush=True)

		# -------------------------
		# Progress handling
		# -------------------------
	def set_progress(self, percent: int):
		percent = max(0, min(100, int(percent)))
		with self._lock:
			if percent != self._progress and not self._finished:
				self._progress = percent
				self._emit({
					"type": "progress",
					"value": percent
				})

		# -------------------------
		# Exit handling
		# -------------------------
	def set_exit(self, category: ExitCategory, message: str):
			with self._lock:
					self._exit_category = category
					self._exit_message = message

	def finish(self):
		with self._lock:
			if self._finished:
				return
			self._finished = True
			if self._exit_category is None:
				self._exit_category = ExitCategory.SUCCESS
				self._exit_message = "Finished"
			self._emit({
				"type": "exit",
				"category": self._exit_category.name,
				"message": self._exit_message
			})
			sys.exit(self._exit_category.value)

	# -------------------------
	# Automatic exception capture
	# -------------------------
	def _handle_unhandled_exception(self, exc_type, exc_value, exc_traceback):
		message = "".join(
			traceback.format_exception(exc_type, exc_value, exc_traceback)
		)
		with self._lock:
			self._exit_category = ExitCategory.SYSTEM_ERROR
			self._exit_message = message.strip()
		self.finish()