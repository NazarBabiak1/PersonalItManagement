using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Data.Models;
using PersonalITManagement.Data.Context; // або твій namespace для ApplicationDbContext
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonalItManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KanbanBoardsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KanbanBoardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/KanbanBoards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KanbanBoardDTO>>> GetKanbanBoards()
        {
            var boards = await _context.KanbanBoards.ToListAsync();

            var boardsDto = boards.Select(b => new KanbanBoardDTO
            {
                Id = b.Id,
                Name = b.Name,
                CreatedDate = b.CreatedDate,
                CreatedByUserId = b.CreatedByUserId
            }).ToList();

            return Ok(boardsDto);
        }

        // GET: api/KanbanBoards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KanbanBoardDTO>> GetKanbanBoard(int id)
        {
            var board = await _context.KanbanBoards.FindAsync(id);

            if (board == null)
                return NotFound();

            var boardDto = new KanbanBoardDTO
            {
                Id = board.Id,
                Name = board.Name,
                CreatedDate = board.CreatedDate,
                CreatedByUserId = board.CreatedByUserId
            };

            return Ok(boardDto);
        }

        // POST: api/KanbanBoards
        [HttpPost]
        public async Task<ActionResult<KanbanBoardDTO>> CreateKanbanBoard(KanbanBoardDTO boardDto)
        {
            var board = new KanbanBoard
            {
                Name = boardDto.Name,
                CreatedDate = boardDto.CreatedDate == default ? DateTime.UtcNow : boardDto.CreatedDate,
                CreatedByUserId = boardDto.CreatedByUserId
            };

            _context.KanbanBoards.Add(board);
            await _context.SaveChangesAsync();

            boardDto.Id = board.Id; // щоб повернути id створеної дошки

            return CreatedAtAction(nameof(GetKanbanBoard), new { id = board.Id }, boardDto);
        }

        // PUT: api/KanbanBoards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKanbanBoard(int id, KanbanBoardDTO boardDto)
        {
            if (id != boardDto.Id)
                return BadRequest();

            var board = await _context.KanbanBoards.FindAsync(id);
            if (board == null)
                return NotFound();

            board.Name = boardDto.Name;
            board.CreatedDate = boardDto.CreatedDate;
            board.CreatedByUserId = boardDto.CreatedByUserId;

            _context.Entry(board).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.KanbanBoards.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/KanbanBoards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKanbanBoard(int id)
        {
            var board = await _context.KanbanBoards.FindAsync(id);
            if (board == null)
                return NotFound();

            _context.KanbanBoards.Remove(board);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
