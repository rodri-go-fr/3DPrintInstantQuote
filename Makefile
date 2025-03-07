start:
	@docker stop prusa-slicer-container 2>/dev/null || true
	@docker rm prusa-slicer-container 2>/dev/null || true
	@./start.sh

stop:
	@docker compose down

install:
	@chmod +x install.sh && ./install.sh

restart:
	@docker compose restart
